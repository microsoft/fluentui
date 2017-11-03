import A11yAttribute, { A11yAttributeType } from './A11yAttribute';
import A11yAttributeProvider from './A11yAttributeProvider';
import A11yManager from './A11yManager';
import DomTraversal from '../dom/DomTraversal';
import FocusTransition from '../focus/FocusTransition';
import FocusTreeProvider from './FocusTreeProvider';

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

  public focus(): boolean {
    return this._manager.focusTo(this._element);
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
      (e: HTMLElement) => A11yAttribute.getFromElementByType(this._manager.prefix, e, A11yAttributeType.Id)
        .filter((a: A11yAttribute) => a.value === id).length > 0,
      this._manager.root,
      checkSelf
    );

    return parent ? new A11yElement(parent, this._manager) : undefined;
  }

  private _ancestorByClass(className: string, checkSelf: boolean = false): A11yElement | undefined {
    const parent: HTMLElement | undefined = DomTraversal.getFirstMatchingParent(
      this._element,
      (e: HTMLElement) => A11yAttribute.getFromElementByType(this._manager.prefix, e, A11yAttributeType.Class)
        .filter((a: A11yAttribute) => a.value === className).length > 0,
      this._manager.root,
      checkSelf
    );

    return parent ? new A11yElement(parent, this._manager) : undefined;
  }
}
