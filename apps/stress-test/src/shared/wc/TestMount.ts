import { performanceMeasure } from '../utils/performanceMeasure';
import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from '../vanilla/types';
import { WCTestTree } from './types';
import { WCSelectorTree } from './WCSelectorTree';
import { styleInjector } from '../css/injectStyles';

export class TestMount extends HTMLElement implements WCTestTree {
  constructor(
    tree: SelectorTreeNode,
    selectors: string[],
    componentRenderer: DOMSelectorTreeComponentRenderer,
    testOptions: TestOptions,
  ) {
    super();

    if (testOptions.withStyles === 'true') {
      styleInjector(selectors);
    }

    const domTree = new WCSelectorTree(componentRenderer, testOptions);
    domTree.tree = tree;

    this.appendChild(domTree);
    requestAnimationFrame(() => performanceMeasure());
  }
}

window.customElements.define('wc-test-mount', TestMount);
