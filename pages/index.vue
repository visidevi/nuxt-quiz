<template>
  <Layout>
    <Transition
      :duration="550"
      enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <Play v-if="!store.start || store.loader" />
      <Results v-else-if="store.concludingMsg" />
    </Transition>
    <Questions
      :clicked="clicked"
      :checked="checked"
      :answer="answer"
      @onClickHandler="updateQuestions"
    />
    <Actions
      ref="actionsRef"
      :text="btnNextText"
      :focus="focus"
      :disabled="btnNextDisabled"
      @onClickHandlerNext="nextQuestion"
    />
  </Layout>
</template>

<script setup>
/**
 * Imports
 */
import { onMounted, ref, computed, nextTick } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
/**
 * Components
 */
import Questions from '@/components/Questions.vue'
import Actions from '@/components/Actions.vue'
import Layout from '@/components/Layout.vue'
import Results from '@/components/Results.vue'
import Play from '@/components/Play.vue'
/**
 * Store
 */
const store = useQuizStore()
/**
 * Mounted
 */
onMounted(() => {
  store.getQuestions()
})
/**
 * Reactive Refs
 */
const clicked = ref('')
const checked = ref(false)
const btnNextDisabled = ref(true)
const focus = ref(false)
const actionsRef = ref(null)

const answer = computed(() => {
  return store.currentQuestion?.answer === clicked.value ? 'green-color' : 'red'
})

/**
 * Computed
 */
const btnNextText = computed(() => {
  if (store.concludingMsg) return `Play Again!`
  return 'Next'
})

/**
 *
 * Methods
 */
onMounted(() => {})
const updateQuestions = (event) => {
  clicked.value = event.clicked
  checked.value = event.checked
  btnNextDisabled.value = event.disabled
  focusNextBtn()
}
const focusNextBtn = async () => {
  await nextTick()
  actionsRef.value.focusNextBtn()
}

const nextQuestion = () => {
  store.nextQuestion(clicked.value)
  checked.value = false
  clicked.value = ''
  btnNextDisabled.value = true
}
</script>
<style>
@import 'bulma/css/bulma.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
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
  letter-spacing: -3px;
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
  background-color: #eff1fa;
}

.content-container {
  position: relative;
  display: block;

  z-index: 1;
}

.Content {
  max-width: 750px;
  margin: 0 auto;
  padding: 75px 0;
  min-height: 50vh;
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
.difficulty-levels button {
  font-family: Open Sans;
}
h2.strong,
button.btn-next .difficulty-levels button {
  font-weight: 800;
}
</style>
