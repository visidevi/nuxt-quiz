<template>
  <div class="content-container has-background-white-bis">
    <div class="columns is-mobile is-centered mt-0">
      <h2 class="is-8 column mt-6 strong">
        {{ store.concludingMsg }}
      </h2>
    </div>
    <div class="columns is-mobile is-centered mt-0">
      <div class="column is-half-mobile is-two-fifths-tablet">
        <p class="is-size-7 has-text-weight-medium has-text-grey-light">
          Score: {{ store.playerScore }} - Points: {{ points }}
        </p>
        <ol class="pb-6 pt-2 has-text-grey">
          <li v-for="(question, i) in store.answers" :key="i">
            <ul>
              <li class="is-size-6 .wr-break">
                {{ question.question }}
              </li>
            </ul>
            <div class="field">
              <div class="control">
                <ul>
                  <li v-for="answer in question.answers" :key="answer">
                    <label
                      :class="[
                        answer === question.playerAnswer &&
                          question.correct &&
                          answer === question.answer &&
                          'has-text-success',
                        answer === question.playerAnswer &&
                          !question.correct &&
                          'has-text-danger',
                      ]"
                      class="radio is-size-7"
                    >
                      <input
                        type="radio"
                        :name="answer"
                        disabled
                        :checked="answer === question.playerAnswer"
                      />
                      {{ answer }}
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
</template>

<script setup>
/**
 * imports
 */
import { computed } from 'vue'
import { useQuizStore } from '../stores/quizStore'
const store = useQuizStore()
const points = computed(() => {
  return `${store.answers.filter((q) => q.correct === true).length} /
            ${store.answers.length}`
})
</script>

<style>
.wr-break {
  word-break: break-all;
}
</style>
