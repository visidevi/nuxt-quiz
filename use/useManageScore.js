/**
 * time {0: 3, 1: 4, 0.5: 1, 0.67: 2, 0.33: 1} Cantidad de usuarios por puntuacion
 * Porcentages por puntuacion{0: 27.27, 1: 36.36, 0.5: 9.09, 0.67: 18.18, 0.33: 9.09}
 */

const ROUND = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Numbers of user
 * @response = { "score": "usersPerScore", .....}
 */

export const getNumberOfUsersPerScore = (scores) => {
  return scores.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : acc[val]++;
    return acc;
  }, {});
};

export const percentagesByScore = (scores, uniqueItems, totalItems) => {
  const response = {};
  uniqueItems.forEach((currScore) => {
    const numItems = scores.filter((sco) => sco === currScore);
    response[currScore] = ROUND((numItems.length * 100) / totalItems);
  });
  console.log(response);
  return response;
};

export const greater = (obj, myScore) =>
  Object.keys(obj)
    .filter((i) => Number(parseFloat(i) || 0) > parseFloat(myScore))
    .map((item) => obj[item])
    .reduce((partialSum, a) => partialSum + a, 0);

export const less = (obj, myScore) =>
  Object.keys(obj)
    .filter((i) => Number(parseFloat(i) || 0) < parseFloat(myScore))
    .map((item) => obj[item])
    .reduce((partialSum, a) => partialSum + a, 0);

export const scoreMessage = (
  bestScore,
  worseScore,
  score,
  minScore,
  greaterThan,
  lessThan
) => {
  if (bestScore) {
    return `You were the best quizzer`
  } else if (worseScore) {
    return `You were the worst quizzer`
  } else if (score === minScore) {
    return `You were worse than ${greaterThan}% of all quizzer`
  } else {
    return `You were better than ${lessThan}% of all quizzer`
  }
};
