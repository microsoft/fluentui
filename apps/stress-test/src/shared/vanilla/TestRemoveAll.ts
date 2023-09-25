import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';
import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from './types';
import { renderVanillaSelectorTree } from './VanillaSelectorTree';

export const testRemoveAll = (
  tree: SelectorTreeNode,
  selectors: string[],
  componentRenderer: DOMSelectorTreeComponentRenderer,
  testOptions: TestOptions,
): HTMLElement => {
  if (testOptions.withStyles === 'true') {
    styleInjector(selectors);
  }

  const wrapper = document.createElement('div');
  wrapper.appendChild(renderVanillaSelectorTree(tree, selectors, componentRenderer, testOptions));

  setTimeout(() => {
    while (wrapper.hasChildNodes()) {
      wrapper.removeChild(wrapper.lastChild!);
    }
    performanceMeasure();
  }, 2000);

  return wrapper;
};
