import { defineStore } from 'pinia'
import { collection, query, doc, onSnapshot, setDoc } from 'firebase/firestore'
import {
  percentagesByScore,
  greater,
  less,
  scoreMessage,
} from '../use/useManageScore'
/**
 * Firebase
 */
import { data } from './data'
import { db } from '@/js/firebase'

const ROUND = (n) => Math.round((n + Number.EPSILON) * 100) / 100

const questionsCollectionRef = collection(db, 'questions')
const answersCollectionRef = collection(db, 'answers')

export const useQuizStore = defineStore({
  id: 'quiz',
  state: () => ({
    loading: true,
    start: false,
    rawQuestions: [],
    questions: data,
    answers: [],
    currentQuestion: null,
    playerScore: 0,
    quantity: 2,
    average: 0,
    bestScore: null,
    worseScore: null,
    minScore: 0,
    maxScore: 1,
    maxPercentage: 100,
    greaterThan: 0,
    lessThan: 0,
    concludingMsg: '',
  }),
  getters: {
    showQuestions: (state) => state.start,
    randomQuestions: (state) =>
      state.questions.sort(() => 0.5 - Math.random()).slice(0, state.quantity),
  },
  actions: {
    async getQuestions() {
      this.loading = true
      const q = query(questionsCollectionRef)
      await onSnapshot(q, (querySnapshot) => {
        const raw = []
        querySnapshot.forEach((doc) => {
          raw.unshift({
            ...doc.data(),
            checked: false,
            correct: undefined,
          })
        })
        this.questions = raw
        this.rawQuestions = raw
        this.loading = false
      })
    },
    async getScore(score) {
      const q = query(answersCollectionRef)

      await onSnapshot(q, (querySnapshot) => {
        const scores = []
        querySnapshot.forEach((item) => scores.unshift(item.data().score))
        const totalItems = scores.length
        const uniqueItems = [...new Set(scores)]

        const obj = percentagesByScore(scores, uniqueItems, totalItems)
        this.greaterThan = greater(obj, score)
        this.lessThan = less(obj, score)

        this.bestScore =
          score === this.maxScore && obj[score] === this.maxPercentage
        this.worseScore =
          score === this.minScore && obj[score] === this.maxPercentage

        this.concludingMsg = scoreMessage(
          this.bestScore,
          this.worseScore,
          score,
          this.minScore,
          greater(obj, score),
          less(obj, score)
        )
        this.loading = false
      })
    },
    async createQuestions() {
      // await data.forEach(async (item) => {
      //   await setDoc(doc(questionsCollectionRef, item.answer), item);
      // });
    },
    async newGame(payload) {
      const currentDate = new Date().getTime()
      const id = currentDate.toString()
      await setDoc(doc(answersCollectionRef, id), {
        payload,
      })
    },
    startGame(n) {
      this.quantity = n
      this.toggleStart()
      this.concludingMsg = ''
      this.currentQuestion = this.randomQuestions[0]
    },
    async nextQuestion(answer) {
      this.questions = this.randomQuestions.map((q) => {
        if (q.answer === this.currentQuestion.answer) {
          return {
            ...q,
            checked: true,
            correct: this.currentQuestion.answer === answer,
            playerAnswer: answer,
          }
        }
        return q
      })
      this.currentQuestion = this.randomQuestions.find((q) => !q.checked)
      if (this.currentQuestion === undefined) {
        this.loading = true
        this.answers = this.questions
        const points = this.questions.filter((q) => q.correct === true).length
        this.playerScore = ROUND(points / this.quantity)
        const time = new Date().getTime().toString()
        await setDoc(doc(answersCollectionRef, time), {
          score: this.playerScore,
          name: `user_${time}`,
        })
        this.getScore(this.playerScore)
        this.questions = this.rawQuestions
      }
    },
    toggleStart() {
      this.start = !this.start
    },
  },
})
