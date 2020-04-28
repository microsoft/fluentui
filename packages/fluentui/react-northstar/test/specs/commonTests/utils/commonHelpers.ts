export default (testName: string, Component: React.ComponentType) => {
  const throwError = (msg: string) => {
    throw new Error(`${testName}: ${msg} \n  Component: ${Component && Component.name}`);
  };

  const assertRequired = (required: boolean, description: string) =>
    required || throwError(`Required ${description}, got: ${required} (${typeof required})`);

  return {
    assertRequired,
    throwError,
  };
};
