import { getTestOptions } from '../utils/testOptions';
import { loadTestData, TestDOMRenderer, TestTreeFixture } from '../utils/testUtils';
import { RandomSelectorTreeNode } from '../tree/types';
import { RandomTree } from '../../../scripts/utils/tree/RandomTree';
import { testInjectStyles } from '../vanilla/TestInjectStyles';
import { testMount } from '../vanilla/TestMount';
import { testRemoveAll } from '../vanilla/TestRemoveAll';
import { testReRenderAll } from '../vanilla/TestReRenderAll';
import { TestInjectStyles } from './TestInjectStyles';
import { TestMount } from './TestMount';
import { TestRemoveAll } from './TestRemoveAll';
import { TestReRenderAll } from './TestReRenderAll';
import { TestAdd } from './TestAdd';
import { testAdd } from '../vanilla/TestAdd';

export const wcTest = (): Promise<HTMLElement | null> => {
  const testOptions = getTestOptions();
  const { test, fixtureName, rendererName, r } = testOptions;

  return loadTestData<TestTreeFixture, TestDOMRenderer>('wc', fixtureName, rendererName ?? r).then(
    ({ fixture, renderer }) => {
      const selectors: string[] = fixture.selectors;
      const fixtureTree = fixture.tree;

      const treeBuilder = new RandomTree<RandomSelectorTreeNode>();
      const tree = treeBuilder.fromFixture(fixtureTree);
      const { wcRenderer } = testOptions;

      let testFn;

      const isWC = wcRenderer === 'wc';

      if (test === 'inject-styles') {
        testFn = isWC ? TestInjectStyles : testInjectStyles;
      } else if (test === 're-render-all') {
        testFn = isWC ? TestReRenderAll : testReRenderAll;
      } else if (test === 'remove-all') {
        testFn = isWC ? TestRemoveAll : testRemoveAll;
      } else if (test === 'add') {
        testFn = isWC ? TestAdd : testAdd;
      } /*if (test === 'mount')*/ else {
        testFn = isWC ? TestMount : testMount;
      }

      if (testFn) {
        if (isWC) {
          /* eslint-disable */
          // @ts-ignore
          return new testFn(tree, selectors, renderer, testOptions);
          /* eslint-enable */
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return testFn(tree, selectors, renderer, testOptions);
        }
      }

      return null;
    },
  );
};
