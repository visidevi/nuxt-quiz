/**
 *
 * @param {number} n
 * @returns number
 */
const ROUND = (n) => Math.round((n + Number.EPSILON) * 100) / 100

/**
 * Numbers of user
 * @response = { "score": "usersPerScore", .....}
 */

/**
 * number of users per score
 * @param {[string]} scores
 * @returns {score: usersPerScore}
 */
export const getNumberOfUsersPerScore = (scores) => {
  return scores.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : acc[val]++
    return acc
  }, {})
}
/**
 * percentages by score
 * @param {[string]} scores
 * @param {[string]} uniqueItems
 * @param {number} totalItems
 * @returns { score: percentage%, ...}
 */

export const percentagesByScore = (scores, uniqueItems, totalItems) => {
  const response = {}
  uniqueItems.forEach((currScore) => {
    const numItems = scores.filter((sco) => sco === currScore)
    response[currScore] = ROUND((numItems.length * 100) / totalItems)
  })
  return response
}

/**
 *
 * @param {{string:string}} obj
 * @param {string} myScore
 * @returns number
 */
export const greater = (obj, myScore) =>
  Object.keys(obj)
    .filter((i) => Number(parseFloat(i) || 0) > parseFloat(myScore))
    .map((item) => obj[item])
    .reduce((partialSum, a) => partialSum + a, 0)

/**
 *
 * @param {{string:string}} obj
 * @param {string} myScore
 * @returns number
 */
export const less = (obj, myScore) =>
  Object.keys(obj)
    .filter((i) => Number(parseFloat(i) || 0) < parseFloat(myScore))
    .map((item) => obj[item])
    .reduce((partialSum, a) => partialSum + a, 0)

/**
 *
 * @param {*} bestScore
 * @param {*} worseScore
 * @param {*} score
 * @param {*} minScore
 * @param {*} greaterThan
 * @param {*} lessThan
 * @returns string
 */

export const scoreMessage = (
  bestScore,
  worseScore,
  score,
  minScore,
  greaterThan,
  lessThan
) => {
  if (bestScore) {
    return `You were the best 🤓 quizzer`
  } else if (worseScore) {
    return `You were the worst 🥹 quizzer`
  } else if (score === minScore) {
    return `You were worse 😞 than ${greaterThan.toFixed(2)}% of all quizzer`
  } else {
    return `You were better 🤓 than ${lessThan.toFixed(2)}% of all quizzer`
  }
}
