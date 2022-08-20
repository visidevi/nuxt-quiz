<template>
  <div class="parallax play">
    <h1 @click="store.startGame">Play!</h1>
  </div>
</template>
<script setup>
import { useQuizStore } from '../stores/quizStore'
const store = useQuizStore()
</script>
