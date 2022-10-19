import { TreeNode } from '../tree/types';

export type WCTreeItemRenderer<T> = (node: T, depth: number, index: number) => HTMLElement;

const template = document.createElement('template');
template.innerHTML = `
  <div class="dom-tree-node"></div>
`;

export class WCTree<T extends TreeNode<unknown>> extends HTMLElement {
  private _root: HTMLElement | ShadowRoot;
  private _tree: T | null;
  private _itemRenderer: WCTreeItemRenderer<T>;
  private _depth: number;
  private _index: number;
  private _useShadowRoot: boolean;

  constructor(itemRenderer: WCTreeItemRenderer<T>, depth: number = 0, index = 0, useShadowRoot: boolean = false) {
    super();

    this._useShadowRoot = useShadowRoot;

    if (useShadowRoot) {
      this._root = this.attachShadow({ mode: 'open' });
    } else {
      this._root = this;
    }
    this._tree = null;
    this._itemRenderer = itemRenderer;
    this._depth = depth;
    this._index = index;
  }

  public set tree(value: T | null) {
    this._tree = value;
    this._render();
  }

  public get tree(): T | null {
    return this._tree;
  }

  private _render() {
    if (this._tree === null) {
      while (this._root.hasChildNodes()) {
        this._root.removeChild(this._root.lastChild!);
      }
      return;
    }

    this._root.appendChild(this._itemRenderer(this._tree, this._depth, this._index));

    this._tree.children.forEach((child, i) => {
      const node = new WCTree(this._itemRenderer, this._depth + 1, i + 1, this._useShadowRoot);
      node.tree = child as T;
      this._root.appendChild(node);
    });
  }
}

window.customElements.define('wc-tree', WCTree);
