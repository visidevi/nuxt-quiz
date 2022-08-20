<template>
  <main class="main">
    <progress v-if="store.loading" c class="progress is-link mb-0"></progress>
    <slot></slot>
  </main>
</template>
<script setup>
import { useQuizStore } from '../stores/quizStore'
/**
 * Header
 */
useHead({
  title: 'Quiz',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'Home assignment - Quiz' }],
  bodyAttrs: {
    class: 'nuxtjs-vuejs',
  },
})
const store = useQuizStore()
</script>
