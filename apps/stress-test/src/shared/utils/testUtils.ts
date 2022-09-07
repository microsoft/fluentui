export type TestFixture = {
  tree: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    children: TestFixture['tree'][];
  };
  selectors: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TestRenderer = (node: any, depth: number, index: number) => any;

export type LoaderResult = {
  fixture: TestFixture;
  renderer: TestRenderer;
};

export const loadTestData = (target: string, fixtureName: string, rendererName: string): Promise<LoaderResult> => {
  return Promise.all([
    import(`../../fixtures/${fixtureName}`),
    import(`../../renderers/${target}/${rendererName}`),
  ]).then(([fixtureResult, rendererResult]) => {
    const { default: fixture } = fixtureResult;
    const { default: renderer } = rendererResult;

    return { fixture, renderer };
  });
};
