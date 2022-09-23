import { performanceMeasure } from '../utils/performanceMeasure';
import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from './types';
import { renderVanillaSelectorTree } from './VanillaSelectorTree';

export const testMount = (
  tree: SelectorTreeNode,
  selectors: string[],
  componentRenderer: DOMSelectorTreeComponentRenderer,
  testOptions: TestOptions,
): HTMLElement => {
  const vanillaTree = renderVanillaSelectorTree(tree, selectors, componentRenderer, testOptions);

  requestAnimationFrame(() => performanceMeasure());
  return vanillaTree;
};
