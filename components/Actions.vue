<template>
  <div
    v-if="store.start"
    class="parallax"
    :class="store.loading && 'has-background-link'"
  >
    <button
      v-if="!store.concludingMsg"
      ref="nextBtnRef"
      :disabled="disabled"
      :class="store.loading ? 'is-loading' : 'btn-next  is-light'"
      class="button is-large is-link"
      @click="emit('onClickHandlerNext')"
    >
      <span class="is-size-1 has-text-weight-strong">
        {{ text }}
      </span>
    </button>
    <button
      v-else
      class="button btn-next is-large is-link is-light is-inverted"
      @click="store.startGame"
    >
      <span class="is-size-1 has-text-weight-strong">
        {{ text }}
      </span>
    </button>
  </div>
</template>

<script setup>
/**
 * Imports
 */
import { ref } from 'vue'
import { useQuizStore } from '../stores/quizStore'

const store = useQuizStore()
const nextBtnRef = ref(null)
const focusNextBtn = () => {
  nextBtnRef.value.focus()
}
defineExpose({
  focusNextBtn,
})
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  focus: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['onClickHandlerNext'])
</script>
