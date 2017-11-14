import A11yElement from './A11yElement';
import A11yManager from './A11yManager';
import Focus from '../focus/Focus';

export default class FocusTreeProvider {
  private _element: HTMLElement;
  private _manager: A11yManager;
  private _root: HTMLElement;

  constructor(element: HTMLElement, manager: A11yManager, root?: HTMLElement) {
    this._element = element;
    this._manager = manager;
    this._root = root || this._manager.root;
  }

  public get children(): A11yElement[] {
    return Focus.getFocusableChildren(this._element)
      .map((e: HTMLElement) => new A11yElement(e, this._manager));
  }

  public get descendents(): A11yElement[] {
    return Focus.getFocusableDescendants(this._element)
      .map((e: HTMLElement) => new A11yElement(e, this._manager));
  }

  public get siblings(): A11yElement[] {
    return Focus.getFocusableSiblings(this._element, this._root)
      .map((e: HTMLElement) => new A11yElement(e, this._manager));
  }

  public get nextSibling(): A11yElement {
    return new A11yElement(Focus.getNextFocusableSibling(this._element, this._root), this._manager);
  }

  public get prevSibling(): A11yElement {
    return new A11yElement(Focus.getPrevFocusableSibling(this._element, this._root), this._manager);
  }

  public get isLastSibling(): boolean {
    const parentChildren: HTMLElement[] = Focus.getFocusableChildren(this.parent.htmlElement);
    return this._element === parentChildren[parentChildren.length - 1];
  }

  public get parent(): A11yElement {
    return new A11yElement(Focus.getFocusableParent(this._element, this._root), this._manager);
  }

  public scopeTo(subRoot: HTMLElement): FocusTreeProvider {
    if (!this._manager.manages(subRoot)) {
      throw new Error('The provided root is not managed by this A11yManager');
    }

    return new FocusTreeProvider(this._element, this._manager, subRoot);
  }
}
