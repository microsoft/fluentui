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
