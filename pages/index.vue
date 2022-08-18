<template>
  <div class="trivia">
    <div class="container">
      <div
        v-if="store.showQuestions && store.currentQuestion"
        class="question-container"
      >
        {{ store.game }}
        <h2 class="question">{{ store.currentQuestion.question }}</h2>
        <div class="answer-buttons btn-gird" :checked="checked">
          <button
            v-for="asw in store.currentQuestion.answers"
            :key="asw"
            class="btn"
            type="button"
            :disabled="disabled"
            :class="[clicked === asw && answer, clicked && color(asw)]"
            @click="selectAnswer(asw)"
          >
            {{ asw }}
          </button>
        </div>

        <!-- <template v-for="item in store.questions" :key="item.id">
          <h2 class="question">{{ item.question }}</h2>
          <div class="answer-buttons btn-gird">
            <button v-for="asw in item.answers" :key="asw" type="button">
              {{ asw }}
            </button>
          </div>
        </template> -->
      </div>
      <div class="controls">
        <div v-if="store.concludingMsg">{{ store.concludingMsg }}</div>
        <button
          class="start-btn btn"
          @click="store.startGame"
          v-if="!store.start"
        >
          Start {{ !store.questions }}
        </button>
        <button class="next-btn btn" v-if="store.start" @click="nextQuestion">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Imports
 */
import { useQuizStore } from "../stores/quiz";
import { onMounted, ref, computed } from "vue";
const clicked = ref("");
const checked = ref(false);
const disabled = ref(false);
const store = useQuizStore();
onMounted(() => {
  store.getQuestions();
});
const answer = computed(() => {
  if (store.currentQuestion.answer === clicked.value) return "green";
  return "red";
});
const color = (a) => {
  if (store.currentQuestion.answer === a) return "green-color";
};
const selectAnswer = (answer) => {
  console.log(answer, store.currentQuestion.answer);
  clicked.value = answer;
  checked.value = true;
};
const nextQuestion = () => {
  store.nextQuestion(clicked.value);
  checked.value = false;
  clicked.value = "";
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
/* .red {
  background-color: red;
} */
div[checked="true"] button.green {
  background-color: green;
}
div[checked="true"] button.red {
  background-color: red;
}
div[checked="true"] button.green-color {
  border-color: green;
  padding: 5px;
  background-color: white;
}
</style>
