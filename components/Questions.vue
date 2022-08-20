<template>
  <div class="content-container has-background-white-bis">
    <div v-if="store.showQuestions && store.currentQuestion" class="Content">
      <div
        class="columns is-mobile is-centered is-vcentered is-multiline is-flex mt-0"
      >
        <div class="column is-10 is-flex-wrap-wrap">
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
</template>
<script setup>
/**
 * Imports
 */
import { computed } from 'vue'
import { useQuizStore } from '../stores/quizStore'

const store = useQuizStore()
const props = defineProps({
  clicked: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  answer: {
    type: String,
    default: '',
  },
})

const color = (a) => {
  if (store.currentQuestion.answer === a) return 'is-hovered'
}
const emit = defineEmits(['onClickHandler'])
const selectAnswer = async (val) => {
  emit('onClickHandler', {
    disabled: false,
    clicked: val,
    checked: true,
  })
}
</script>
