import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from './types';
import { renderVanillaSelectorTree } from './VanillaSelectorTree';
import { styleInjector } from '../css/injectStyles';
import afterframe from 'afterframe';

export const testMount = (
  tree: SelectorTreeNode,
  selectors: string[],
  componentRenderer: DOMSelectorTreeComponentRenderer,
  testOptions: TestOptions,
): HTMLElement => {
  performance.mark('start');

  if (testOptions.withStyles === 'true') {
    styleInjector(selectors);
  }

  const vanillaTree = renderVanillaSelectorTree(tree, selectors, componentRenderer, testOptions);

  afterframe(() => {
    performance.measure('stress', 'start');
  });
  return vanillaTree;
};
