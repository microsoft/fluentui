import * as React from 'react';
import { getTestOptions, TestOptions } from '../utils/testOptions';
import { loadTestData, TestRenderer } from '../utils/testUtils';
import { RandomSelectorTreeNode } from '../tree/RandomSelectorTreeNode';
import { RandomTree, TreeNode } from '../tree/RandomTree';
import { TestInjectStyles } from './TestInjectStyles';
import { TestMount } from './TestMount';
import { TestRemoveAll } from './TestRemoveAll';
import { TestReRenderAll } from './TestReRenderAll';
import { TestAdd } from './TestAdd';

type TestData = {
  tree?: TreeNode<RandomSelectorTreeNode>;
  selectors?: string[];
  testOptions: TestOptions;
  renderer?: TestRenderer;
};

type ReactTestProps = {
  target: string;
  fixtureName: string;
  rendererName: string;
};

export const ReactTest: React.FC<ReactTestProps> = ({ target, fixtureName, rendererName }) => {
  const [testData, setTestData] = React.useState<TestData>({
    testOptions: getTestOptions(),
  });

  React.useEffect(() => {
    loadTestData(target, fixtureName, rendererName).then(({ fixture, renderer }) => {
      const selectors = fixture.selectors;
      const fixtureTree = fixture.tree;

      const treeBuilder = new RandomTree<RandomSelectorTreeNode>();
      const tree = treeBuilder.fromFixture(fixtureTree);

      setTestData({
        ...testData,
        tree,
        selectors,
        renderer,
      });
    });
  }, []);

  const {
    testOptions: { test },
    tree,
    selectors,
    renderer,
  } = testData;

  let Test;
  switch (test) {
    case 'inject-styles':
      Test = TestInjectStyles;
      break;

    case 'mount':
      Test = TestMount;
      break;

    case 're-render-all':
      Test = TestReRenderAll;
      break;

    case 'remove-all':
      Test = TestRemoveAll;
      break;

    case 'add':
      Test = TestAdd;
      break;

    default:
      Test = TestMount;
      break;
  }

  return (
    <>
      {selectors && tree && (
        <Test tree={tree} selectors={selectors} componentRenderer={renderer!} testOptions={testData.testOptions!} />
      )}
    </>
  );
};
