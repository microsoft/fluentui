import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from '../vanilla/types';
import { WCTree } from './WCTree';

const template = document.createElement('template');
template.innerHTML = `<div class="dom-selector-tree"></div>`;

export class WCSelectorTree extends HTMLElement {
  private _root: HTMLElement | ShadowRoot;
  private _testOptions: TestOptions;
  private _tree: SelectorTreeNode | null;
  private _componentRenderer: DOMSelectorTreeComponentRenderer;

  constructor(componentRenderer: DOMSelectorTreeComponentRenderer, testOptions: TestOptions) {
    super();

    this._testOptions = testOptions;
    this._tree = null;

    this._componentRenderer = componentRenderer;

    if (this._testOptions?.useShadowRoot === 'true') {
      this._root = this.attachShadow({ mode: 'open' });
    } else {
      this._root = this;
    }
  }

  public set tree(value: SelectorTreeNode | null) {
    this._tree = value;

    if (value === null) {
      while (this._root.hasChildNodes()) {
        this._root.removeChild(this._root.lastChild!);
      }
    } else {
      const wcTree = new WCTree(this._itemRenderer, undefined, undefined, this._testOptions?.useShadowRoot === 'true');
      wcTree.tree = value;
      this._root.appendChild(wcTree);
    }
  }

  public get tree() {
    return this._tree;
  }

  private _itemRenderer = (node: SelectorTreeNode, depth: number, index: number): HTMLElement => {
    const { value } = node;

    const div = document.createElement('div');
    div.classList.add(...value.classNames.map(cn => cn.substring(1)));
    value.attributes.forEach(attr => {
      div.setAttribute(attr.key, attr.value ?? '');
    });

    div.style.marginLeft = `${depth * 10}px`;
    div.appendChild(this._componentRenderer(node, depth, index));

    return div;
  };
}

window.customElements.define('wc-selector-tree', WCSelectorTree);
