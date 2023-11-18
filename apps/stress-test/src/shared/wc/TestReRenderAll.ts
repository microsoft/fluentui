import { TestOptions } from '../utils/testOptions';
import { WCSelectorTree } from './WCSelectorTree';
import { WCTestTree } from './types';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from '../vanilla/types';
import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';

export class TestReRenderAll extends HTMLElement implements WCTestTree {
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

    setTimeout(() => {
      domTree.tree = null;

      setTimeout(() => {
        domTree.tree = tree;
        requestAnimationFrame(() => performanceMeasure());
      }, 2000);
    }, 2000);
  }
}

window.customElements.define('wc-test-re-render-all', TestReRenderAll);
