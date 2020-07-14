export const commonHelpers = (testName, Component) => {
  const throwError = msg => {
    throw new Error(`${testName}: ${msg} \n  Component: ${Component && Component.name}`);
  };

  const assertRequired = (required, description) =>
    required || throwError(`Required ${description}, got: ${required} (${typeof required})`);

  return {
    assertRequired,
    throwError,
  };
};
