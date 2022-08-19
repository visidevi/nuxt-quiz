<template>
  <main class="main">
    <div v-if="store.concludingMsg" class="content-container bg-white">
      <div class="columns is-mobile is-centered">
        <h2 class="is-full column">
          {{ store.concludingMsg }}
        </h2>
      </div>
      <div class="columns is-mobile is-centered mt-0">
        <div
          class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen"
        >
          <p class="is-size-7 has-text-weight-medium has-text-grey-light">
            Score: {{ store.playerScore }} - Points: {{ points }}
          </p>
          <ol class="pb-6 pt-2 has-text-grey">
            <li v-for="(a, i) in store.answers" :key="i">
              <ul>
                <li
                  class="is-size-6"
                  :class="
                    b === a.playerAnswer && b === a.answer && 'has-text-success'
                  "
                >
                  {{ a.question }}
                </li>
              </ul>
              <div class="field">
                <div class="control">
                  <ul>
                    <li v-for="b in a.answers" :key="b">
                      <label
                        :class="[
                          b === a.playerAnswer &&
                            a.correct &&
                            b === a.answer &&
                            'has-text-success',
                          b === a.playerAnswer &&
                            !a.correct &&
                            'has-text-danger',
                        ]"
                        class="radio is-size-7"
                      >
                        <input
                          type="radio"
                          :name="b"
                          disabled
                          :checked="b == a.playerAnswer"
                        />
                        {{ b }}
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div v-if="!store.start" class="parallax play">
      <h1 v-if="!store.start" @click="store.startGame">Play!</h1>
    </div>

    <div
      class="content-container bg-white"
      :class="store.showQuestions && store.currentQuestion && 'bg-white'"
    >
      <div v-if="store.showQuestions && store.currentQuestion" class="Content">
        <div
          class="columns is-mobile is-centered is-vcentered is-multiline is-flex"
        >
          <div class="column is-10">
            <h2>
              {{ store.currentQuestion.question }}
            </h2>
          </div>
          <div
            v-if="store.showQuestions && store.currentQuestion"
            class="column is-10"
          >
            <div
              class="buttons are-larger is-centered is-flex"
              :checked="checked"
            >
              <button
                v-for="asw in store.currentQuestion.answers"
                :key="asw"
                class="button is-responsive is-large"
                type="button"
                :disabled="checked"
                :class="[clicked === asw && answer, clicked && color(asw)]"
                @click="selectAnswer(asw)"
              >
                {{ asw }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.start" class="parallax">
      <button
        v-if="!store.concludingMsg"
        ref="nextBtnRef"
        :disabled="btnNextDisable"
        class="button btn-next is-large is-link is-light is-inverted"
        @click="nextQuestion"
      >
        <span class="is-size-1"> {{ btnNextText }} </span>
      </button>
      <button
        v-if="store.concludingMsg"
        ref="nextBtnRef"
        class="button btn-next is-large is-link is-light is-inverted"
        @click="store.startGame"
      >
        <span class="is-size-1"> {{ btnNextText }} </span>
      </button>
    </div>
  </main>
</template>

<script setup>
/**
 * Imports
 */
import { onMounted, ref, computed, nextTick } from 'vue'
import { useQuizStore } from '../stores/quiz'
useHead({
  title: 'Quiz',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'Home assignment - Quiz' }],
  bodyAttrs: {
    class: 'nuxtjs-vuejs',
  },
})
const clicked = ref('')
const checked = ref(false)
const btnNextDisable = ref(true)
const store = useQuizStore()
const nextBtnRef = ref(null)
const points = computed(() => {
  return `${store.answers.filter((q) => q.correct === true).length} /
            ${store.answers.length}`
})
const btnNextText = computed(() => {
  if (store.concludingMsg) return `Play Again!`
  return 'Next'
})

const focusNextBtn = () => {
  nextBtnRef.value.focus()
}
onMounted(() => {
  store.getQuestions()
})
const answer = computed(() => {
  if (store.currentQuestion.answer === clicked.value) return 'green-color'
  return 'red'
})
const color = (a) => {
  if (store.currentQuestion.answer === a) return 'is-hovered'
}
const selectAnswer = async (val) => {
  clicked.value = val
  checked.value = true
  btnNextDisable.value = false
  await nextTick()
  focusNextBtn()
}
const nextQuestion = () => {
  btnNextDisable.value = true
  store.nextQuestion(clicked.value)
  checked.value = false
  clicked.value = ''
}
</script>
<style>
@import 'bulma/css/bulma.min.css';
body {
  margin: 0;
}
div[checked='true'] button.green {
  background-color: green;
}
div[checked='true'] button.red {
  border-color: red;
  background-color: red;
  color: white;
}
div[checked='true'] button.green-color {
  border-color: green;
  color: green;
  padding: 5px;
  background-color: white;
}
.columns.is-vcentered {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
html,
body {
  font-family: Open Sans;
  font-size: 18px;
  line-height: 28px;
  scroll-behavior: smooth;
}

h1 {
  letter-spacing: -15px;
  font-family: Open Sans;
  color: #3850b7;
  text-align: center;
  font-size: 200px;
  font-weight: 800;
  line-height: 200px;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - -40px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 20px);
  text-align: center;
  white-space: nowrap;
}
h2,
.btn-next {
  letter-spacing: -1px;
  font-family: Open Sans;
  text-align: center;
  font-size: 60px;
  line-height: 60px;
}

main.main {
  perspective: 1px;
  transform-style: preserve-3d;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.content-container {
  position: relative;
  display: block;

  z-index: 1;
}
.bg-white {
  background-color: white;
}

.Content {
  max-width: 750px;
  margin: 0 auto;
  padding: 75px 0;
}

.m-75,
.columns {
  margin: 75px 0;
}

.parallax {
  display: flex;
  flex: 1 0 auto;
  position: relative;
  z-index: -1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  transform: translateZ(-1px) scale(2);
  background-color: #eff1fa;
}
.parallax .play {
  background-color: #eff1fa;
}
.span.btn-next {
  margin: 75px 0;
  letter-spacing: -15px;
  font-family: Open Sans;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - -40px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 20px);
  text-align: center;
  white-space: nowrap;
}
</style>
