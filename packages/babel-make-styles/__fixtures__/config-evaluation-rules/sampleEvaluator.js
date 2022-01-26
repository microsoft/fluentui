// @ts-check

/** @type {import("@linaria/babel-preset").Evaluator} */
const sampleEvaluator = () => {
  // Evaluators transform input code to something that will be evaluated by Node later. In evaluatePathsInVM() we expect
  // that results will be available as "exports.__mkPreval", this evaluator mocks it
  const result = `exports.__mkPreval = [{ root: { color: 'blue' } }]`;

  return [result, null];
};

module.exports.default = sampleEvaluator;
