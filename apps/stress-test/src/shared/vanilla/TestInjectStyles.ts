import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';
import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from './types';
import { renderVanillaSelectorTree } from './VanillaSelectorTree';

export const testInjectStyles = (
  tree: SelectorTreeNode,
  selectors: string[],
  componentRenderer: DOMSelectorTreeComponentRenderer,
  testOptions: TestOptions,
): HTMLElement => {
  const vanillaTree = renderVanillaSelectorTree(tree, selectors, componentRenderer, testOptions);

  setTimeout(() => {
    styleInjector(selectors);
    performanceMeasure();
  }, 2000);

  return vanillaTree;
};
