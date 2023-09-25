export type TestTreeFixture = {
  tree: {
    value: unknown;
    children: TestTreeFixture['tree'][];
  };
  selectors: string[];
};

export type TestReactRenderer = (node: unknown, depth: number, index: number) => JSX.Element;
export type TestDOMRenderer = (node: unknown, depth: number, index: number) => HTMLElement;

export type LoaderResult<TFixture, TRenderer> = {
  fixture: TFixture;
  renderer: TRenderer;
};

export const loadTestData = <TFixture, TRenderer>(
  target: string,
  fixtureName: string,
  rendererName: string,
): Promise<LoaderResult<TFixture, TRenderer>> => {
  return Promise.all([
    import(`../../fixtures/${fixtureName}`),
    import(`../../renderers/${target}/${rendererName}`),
  ]).then(([fixtureResult, rendererResult]) => {
    const { default: fixture } = fixtureResult;
    const { default: renderer } = rendererResult;

    return { fixture, renderer };
  });
};
