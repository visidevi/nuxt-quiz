import { defineStore } from "pinia";
import { collection, query, doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  getNumberOfUsersPerScore,
  percentagesByScore,
  greater,
  less,
  scoreMessage,
} from "../use/useManageScore";
/**
 * Firebase
 */
import { db } from "@/js/firebase";

const ROUND = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

const questionsCollectionRef = collection(db, "questions");
const answersCollectionRef = collection(db, "answers");

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    start: false,
    rawQuestions: [],
    questions: [],
    answers: [],
    currentQuestion: null,
    game: {
      score: 0,
      name: "",
    },
    quantity: 2,
    average: 0,
    bestScore: null,
    worseScore: null,
    minScore: 0,
    maxScore: 1,
    maxPercentage: 100,
    greaterThan: 0,
    lessThan: 0,
    concludingMsg: "",
  }),
  getters: {
    showQuestions: (state) => state.start,
    randomQuestions: (state) =>
      state.questions.sort(() => 0.5 - Math.random()).slice(0, state.quantity),
  },
  actions: {
    getQuestions() {
      const q = query(questionsCollectionRef);
      onSnapshot(q, (querySnapshot) => {
        const raw = [];
        querySnapshot.forEach((doc) => {
          raw.unshift({
            ...doc.data(),
            checked: false,
            correct: undefined,
          });
        });
        this.questions = raw;
        this.rawQuestions = raw;
      });
      // unsubscribe()
    },
    async getScore(score) {
      const q = query(answersCollectionRef);
      let scores = [];
      await onSnapshot(q, (querySnapshot) => {
        const raw = [];
        querySnapshot.forEach((item) => raw.unshift(item.data().score));
        console.log(raw, "RAWWWW");
        scores = raw;

        console.log(scores, "RAWWWWscores");
        let total = 0;
        scores.forEach((num) => {
          total += num;
        });
        const average = total / scores.length;
        console.log("Average:", average, "score:", score);
        const numberOfUsersPerScore = getNumberOfUsersPerScore(scores);
        console.log(numberOfUsersPerScore, "numberOfUsersPerScore");
        console.log(score, "score");
        const totalItems = scores.length;
        const uniqueItems = [...new Set(scores)];

        const obj = percentagesByScore(scores, uniqueItems, totalItems);
        this.greaterThan = greater(obj, score);
        this.lessThan = less(obj, score);

        this.bestScore =
          score === this.maxScore && obj[score] === this.maxPercentage;
        this.worseScore =
          score === this.minScore && obj[score] === this.maxPercentage;

        this.concludingMsg = scoreMessage(
          this.bestScore,
          this.worseScore,
          score,
          this.minScore,
          greater(obj, score),
          less(obj, score)
        );
      });
      this.toggleStart();
      // unsubscribe()
    },
    async createQuestions() {
      // await data.forEach(async (item) => {
      //   await setDoc(doc(questionsCollectionRef, item.answer), item);
      // });
    },
    async newGame(payload) {
      const currentDate = new Date().getTime();
      const id = currentDate.toString();
      await setDoc(doc(answersCollectionRef, id), {
        payload,
      });
    },
    startGame() {
      this.concludingMsg = "";
      this.currentQuestion = this.randomQuestions[0];
      this.toggleStart();
    },
    async nextQuestion(answer) {
      this.questions = this.randomQuestions.map((q) => {
        if (q.answer === this.currentQuestion.answer) {
          console.log(
            this.currentQuestion.answer === answer,
            "this.currentQuestion.answer === answer",
            answer
          );
          return {
            ...q,
            checked: true,
            correct: this.currentQuestion.answer === answer,
          };
        }
        return q;
      });
      console.log(this.questions, "this.questions");
      this.currentQuestion = this.randomQuestions.find((q) => !q.checked);
      if (this.currentQuestion === undefined) {
        const points = this.questions.filter((q) => q.correct === true).length;
        console.log(
          this.questions.filter((q) => q.correct === true),
          this.questions,
          "Points",
          points / this.quantity
        );
        const score = ROUND(points / this.quantity);
        const time = new Date().getTime().toString();
        await setDoc(doc(answersCollectionRef, time), {
          score,
          name: `user_${time}`,
        });
        this.getScore(score);
        this.questions = this.rawQuestions;
      }
    },
    toggleStart() {
      this.start = !this.start;
    },
  },
});
