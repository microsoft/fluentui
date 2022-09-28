export type TestFixture = {
  tree: {
    value: unknown;
    children: TestFixture['tree'][];
  };
  selectors: string[];
};

export type TestRenderer = (node: unknown, depth: number, index: number) => unknown;
