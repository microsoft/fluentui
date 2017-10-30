import DOM from '../dom/DomTraversal';

/**
 * A class to model focus transition and provides useful APIs to deal with a focus transition.
 *
 * @public
 */
export default class FocusTransition {
  private _src: HTMLElement | undefined;
  private _dest: HTMLElement | undefined;
  private _root: HTMLElement;

  constructor(
    src: HTMLElement | undefined,
    dest: HTMLElement | undefined,
    root?: HTMLElement
  ) {
    this._src = src;
    this._dest = dest;
    this._root = root || document.body;
  }

  public get src(): HTMLElement | undefined {
    return this._src;
  }

  public get dest(): HTMLElement | undefined {
    return this._dest;
  }

  public get root(): HTMLElement {
    return this._root;
  }

  public forEachElementInPath(callback: (element: HTMLElement, isOutward: boolean) => void): void {
    DOM.forEachElementInPath(this._src, this._dest, callback, this._root);
  }
}
