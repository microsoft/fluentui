import A11yAttribute, { A11yAttributeType } from './A11yAttribute';
import A11yManager from './A11yManager';
import DomTraversal from '../dom/DomTraversal';
import Focus from '../focus/Focus';
import FocusTransition from '../focus/FocusTransition';

export interface INavigateOnKeyAttribute {
  keyCode: number;
  target: string;
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
}

export class FocusTreeProvider {
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

export class A11yAttributeProvider {
  private _element: HTMLElement;
  private _managerPrefix: string;

  constructor(element: HTMLElement, managerPrefix: string) {
    this._element = element;
    this._managerPrefix = managerPrefix;
  }

  public get id(): string | undefined {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.Id)[0];
    return attr ? attr.value : undefined;
  }

  public get classList(): string[] {
    const attrs: A11yAttribute[] = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.Class);
    return attrs.map((a: A11yAttribute) => a.value!).filter((s: string) => !!s);
  }

  public get skipKeys(): number[] | 'all' {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.SkipKeys)[0];
    if (attr && attr.value) {
      return attr.value === 'all' ? 'all' :
        attr.value.split(',').map((keyCodeStr: string) => parseInt(keyCodeStr, 10));
    } else {
      return [];
    }
  }

  public get stopKeys(): number[] | 'all' {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.StopKeys)[0];
    if (attr && attr.value) {
      return attr.value === 'all' ? 'all' :
        attr.value.split(',').map((keyCodeStr: string) => parseInt(keyCodeStr, 10));
    } else {
      return [];
    }
  }

  public get navigateOnKeyList(): INavigateOnKeyAttribute[] {
    const attrs: A11yAttribute[] = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.NavigateOnKey);
    return attrs.map((navAttr: A11yAttribute) => {
      return {
        keyCode: parseInt(navAttr.params[0], 10),
        target: navAttr.value ? navAttr.value.trim() : '',
        alt: navAttr.params.indexOf('a') > 0,
        ctrl: navAttr.params.indexOf('c') > 0,
        shift: navAttr.params.indexOf('s') > 0
      }
    });
  }

  public get navigationMode(): string | undefined {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.NavigationMode)[0];
    return attr ? attr.value : undefined;
  }
}

export default class A11yElement {
  private _element: HTMLElement;
  private _manager: A11yManager;
  private _attributes: A11yAttributeProvider;
  private _focusTree: FocusTreeProvider;

  constructor(element: HTMLElement, manager: A11yManager) {
    this._element = element;
    this._manager = manager;

    this._attributes = new A11yAttributeProvider(element, manager.prefix);
    this._focusTree = new FocusTreeProvider(element, manager);
  }

  public get attributes(): A11yAttributeProvider {
    return this._attributes;
  }

  public get focusTree(): FocusTreeProvider {
    return this._focusTree;
  }

  public get htmlElement(): HTMLElement {
    return this._element;
  }

  public descendents(selector: string, checkSelf: boolean = false): A11yElement[] {
    const token: string = selector[0];
    const value: string = selector.substr(1);

    if (token === '.') {
      return this._descendentsByClass(value);
    } else if (token === '#') {
      return [this._descendentById(value)];
    }

    return [];
  }

  public ancestor(selector: string, checkSelf: boolean = false): A11yElement | undefined {
    const token: string = selector[0];
    const value: string = selector.substr(1);

    if (token === '.') {
      return this._ancestorByClass(value, checkSelf);
    } else if (token === '#') {
      return this._ancestorById(value, checkSelf);
    }

    return undefined;
  }

  public addFocusListener(
    direction: 'inward' | 'outward',
    handler: (focusTransition: FocusTransition) => void
  ): number {
    return this._manager.addFocusListener(this._element, direction, handler);
  }

  private _descendentsByClass(className: string): A11yElement[] {
    const classAttribute: string = A11yAttribute.getPrefix(this._manager.prefix, A11yAttributeType.Class);
    const nodeList: NodeList = this._element.querySelectorAll(`[${classAttribute}='${className}']`);
    // Convert nodelist to an array using slice method
    const elements: HTMLElement[] = Array.prototype.slice.call(nodeList) as HTMLElement[];
    return elements.map((e: HTMLElement) => new A11yElement(e, this._manager));
  }

  private _descendentById(id: string): A11yElement {
    const idAttribute: string = A11yAttribute.getPrefix(this._manager.prefix, A11yAttributeType.Id);
    const element: HTMLElement = this._element.querySelector(`[${idAttribute}='${id}']`) as HTMLElement;
    return new A11yElement(element, this._manager);
  }

  private _ancestorById(id: string, checkSelf: boolean = false): A11yElement | undefined {
    const parent: HTMLElement | undefined = DomTraversal.getFirstMatchingParent(
      this._element,
      (e: HTMLElement) => A11yAttribute.getFromElementByType(this._manager.prefix, e, A11yAttributeType.Id).filter(a => a.value === id).length > 0,
      this._manager.root,
      checkSelf
    );

    return parent ? new A11yElement(parent, this._manager) : undefined;
  }

  private _ancestorByClass(className: string, checkSelf: boolean = false): A11yElement | undefined {
    const parent: HTMLElement | undefined = DomTraversal.getFirstMatchingParent(
      this._element,
      (e: HTMLElement) => A11yAttribute.getFromElementByType(this._manager.prefix, e, A11yAttributeType.Class).filter(a => a.value === className).length > 0,
      this._manager.root,
      checkSelf
    );

    return parent ? new A11yElement(parent, this._manager) : undefined;
  }
}
