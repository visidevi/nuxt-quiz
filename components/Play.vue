<template>
  <div class="parallax play">
    <div v-if="play" class="columns is-centered is-flex">
      <div class="buttons difficulty-levels">
        <button
          v-for="difficulty in difficultyLevels"
          :key="difficulty.label"
          class="button is-link is-large is-responsive is-rounded"
          @click="store.startGame(difficulty.val)"
        >
          {{ difficulty.label }}
        </button>
      </div>
    </div>
    <h1 v-else @click="play = !play">Play!</h1>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useQuizStore } from '../stores/quizStore'
const store = useQuizStore()
const play = ref(false)
const difficultyLevels = [
  {
    label: 'Easy',
    val: 2,
  },
  {
    label: 'Normal',
    val: 5,
  },
  { label: 'Hard', val: 10 },
]
</script>
