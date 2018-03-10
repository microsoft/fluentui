import DOM from '../dom/DomTraversal';

/**
 * Enum for types of A11yAttributes
 *
 * @public
 */
export enum A11yAttributeType {
  /**
   * This attribute is used to identify the element. The value should be unique in the managed tree.
   * The value of this attribute can be used to reference this element in other utilites that A11yManager provides.
   *
   * Params: None
   * Value Format: string containing alphanumerical characters, dashes and underscores
   *
   * Example: <button data-a11y-id="button1">Button</button>
   */
  Id,

  /**
   * This attribute is used to specify a class for the element. Class is useful to define rules for repeating patterns.
   * The value of this attribute can be used to reference this element in other utilites that A11yManager provides.
   *
   * Params: None
   * Value Format: string containing alphanumerical characters, dashes and underscores (multiple classes NOT supported)
   *
   * Example: <button data-a11y-class="button">Button</button>
   */
  Class,

  /**
   * This attribute is used to define a message to be read to screen reader whenever the focus transition is
   * going inside the marked up element. While this is not an alternative to aria-label, it's very useful for
   * marking containers that are not focusable themselves. For example, to alert the user that they have
   * entered a menu, panel, etc.
   *
   * Params: None
   * Value Format: string
   *
   * Example: <div data-a11y-alertonfocusin="You entered the menu.">...</div>
   */
  AlertOnFocusIn,

  /**
   * This attribute is used to define a message to be read to screen reader whenever the focus transition is
   * going outside of the marked up element.
   *
   * Params: None
   * Value Format: string
   *
   * Example: <div data-a11y-alertonfocusout="You exited the menu.">...</div>
   */
  AlertOnFocusOut,

  /**
   * Any keydown event originated in the marked up element or its children will be skipped by the manager and
   * will be let to propagate.
   *
   * Params: None
   * Value Format: comma separated integer key codes or 'all'
   *
   * Example: <div data-a11y-skipkeys="65,66,67">'a', 'b', 'c' key strokes are skipped here.</div>
   * Example: <div data-a11y-skipkeys="all">All key strokes are skipped here.</div>
   */
  SkipKeys,

  /**
   * Any keydown event originated in the marked up element or its children will be stopped by the manager.
   * This means that they will not be handled by the manager and will not let to propagate either.
   *
   * Params: None
   * Value Format: comma separated integer key codes or 'all'
   *
   * Example: <div data-a11y-stopkeys="65,66,67">'a', 'b', 'c' key strokes are stopped here.</div>
   * Example: <div data-a11y-stopkeys="all">All key strokes are stopped here.</div>
   */
  StopKeys,

  /**
   * If the key stroke specified by the params is detected on the element, the focus will go to the element specified
   * by the attribute value which is a selector. The selector can use target element's a11y id or a11y class or
   * one of the provided navigation operators ($next, $prev, $inside, $outside).
   *
   * Params: <keyCode>-<a?>-<c?>-<s?>
   * Value Format: The selector for target element using Id or Class.
   *  Selector can use one of the following formats:
   *  - Id selector: '#' character followed by target element's a11y id e.g. '#menubutton1' (similar to css)
   *    Id selector matches the first element with matching a11y id in the whole managed tree.
   *  - Class selector: '.' character followed by target element's a11y class e.g. '.menubutton' (similar to css)
   *    Class selector matches the first element with matching a11y class inside the markedup element.
   *  - Navigation operator: $next, $prev, $inside, and $outside
   *    Respectively, they target the next focusable sibling, previous focusable sibling,
   *    first focusable child, and focusable parent
   *
   * Example:
   * <div data-a11y-id="propertypane">...</div>
   * <div id='app'
   *    data-a11y-navigateonkey-80-a='#propertypane'><!-- Alt+P takes focus to PropertyPane -->
   *    <!-- Alt+F10 inside web part takes focus to web part toolbar -->
   *    <!-- Ctrl+Up inside web part takes focus to previous web part -->
   *    <!-- Ctrl+Down inside web part takes focus to next web part -->
   *    <div class='webpart'
   *      data-a11y-navigateonkey-121-a='.toolbar'
   *      data-a11y-navigateonkey-38-c='$prev'
   *      data-a11y-navigateonkey-40-c='$next'
   *    >
   *      <div data-sp-class='toolbar'>Web part 1 toolbar</div>
   *      <div>Web part 1 content</div>
   *    </div>
   *    <div class='webpart'
   *      data-a11y-navigateonkey-121-a='.toolbar'
   *      data-a11y-navigateonkey-38-c='$prev'
   *      data-a11y-navigateonkey-40-c='$next'
   *    >
   *      <div data-sp-class='toolbar'>Web part 2 toolbar</div>
   *      <div>Web part 2 content</div>
   *    </div>
   * </div>
   */
  NavigateOnKey,

  /**
   * Params: None
   * Value Format: None (The value does not matter)
   * Example: <div data-a11y-navigatebyhierarchy="1">... Use Tab/Shift+Tab/Enter/Escape to navigate here ...</div>
   *
   * Uses Hierarchical Navigation inside the marked up element. For more information about Hierarchical Navigation
   * refer to A11yManager. It has no effect if Hierarchical Navigation is already enabled by an ancestor.
   */
  NavigateByHierarchy,

  NavigationMode,
  NavigationModeParameters,
}

/**
 * This class represents a data structure for attributes that we use to markup HTML elements to declaratively define
 * a11y-related behaviors.
 *
 * The attributes name format is as follows: <appPrefix>-<attributeType>-<params?>
 * appPrefix is a string provided by A11yManager to make the attributes unique to the manager e.g. data-a11y
 * attributeType is a string identifier for the attribute type e.g. navigateonkey
 * params is an optional set of strings separated by dash that represent the parameters of the attribute e.g. 27-c-a
 *
 * Example: Pressing Ctrl+Alt+Escape inside menu element should set focus to Button1 element
 * <div data-a11y-id='menu' data-a11y-navigateonkey-27-c-a='#button1'>...</div>
 * <button data-a11y-id='button1'>Button1</button>
 *
 * The corresponding A11yAttribute instance would have the following property values:
 * appPrefix: 'data-a11y-',
 * type: NAVIGATION_ON_KEY,
 * params: ['27', 'c', 'a']
 * value: 'button1'
 *
 * @public
 */
export default class A11yAttribute {
  private _appPrefix: string;
  private _type: A11yAttributeType;
  private _params?: string[];
  private _value?: string;

  /**
   * Get the attribute prefix for a given attribute type
   */
  public static getPrefix(appPrefix: string, type: A11yAttributeType): string {
    return appPrefix + A11yAttribute._getTypeString(type);
  }

  /**
   * Get all a11y attributes from an element
   */
  public static getAllFromElement(appPrefix: string, element: HTMLElement): A11yAttribute[] {
    const result: A11yAttribute[] = [];
    // This gets all the A11yAttributeType enum values
    const types: A11yAttributeType[] =
      Object.keys(A11yAttributeType)
        .map((k: string) => (A11yAttributeType as any)[k])  // tslint:disable-line:no-any
        .filter((v: string | number) => typeof v === 'number');

    for (const type of types) {
      for (let i = 0; i < element.attributes.length; i++) {
        const attrName: string = element.attributes[i].name;
        // If the prefix for this type matched, get the params and value
        const prefix: string = A11yAttribute.getPrefix(appPrefix, type);
        if (attrName.substring(0, prefix.length) === prefix) {
          const params: string[] | undefined =
            attrName[prefix.length] === '-' ? attrName.substr(prefix.length + 1).split('-') : undefined;
          const value: string | undefined = element.getAttribute(attrName) || undefined;
          result.push(new A11yAttribute(appPrefix, type, params, value));
        }
      }
    }
    return result;
  }

  /**
   * Get the a11y attribute of a given type from the element
   */
  public static getFromElementByType(
    appPrefix: string,
    element: HTMLElement,
    type: A11yAttributeType
  ): A11yAttribute[] {
    return A11yAttribute.getAllFromElement(appPrefix, element).filter((a: A11yAttribute) => a.type === type);
  }

  /**
   * Get the a11y attribute of a given type from the element or its lowest parent that has the attribute.
   */
  public static getFromElementOrParentsByType(
    appPrefix: string,
    element: HTMLElement,
    root: HTMLElement,
    type: A11yAttributeType
  ): A11yAttribute | undefined {
    let attr: A11yAttribute | undefined;
    DOM.getFirstMatchingParent(element, (p: HTMLElement) => {
      attr = A11yAttribute.getAllFromElement(appPrefix, p).filter((a: A11yAttribute) => a.type === type)[0];
      return !!attr;
    }, root, true);
    return attr || undefined;
  }

  private static _getTypeString(type: A11yAttributeType): string {
    switch (type) {
      case A11yAttributeType.Id: return 'id';
      case A11yAttributeType.Class: return 'class';
      case A11yAttributeType.SkipKeys: return 'skipkeys';
      case A11yAttributeType.StopKeys: return 'stopkeys';
      case A11yAttributeType.AlertOnFocusIn: return 'alertonfocusin';
      case A11yAttributeType.AlertOnFocusOut: return 'alertonfocusout';
      case A11yAttributeType.NavigateOnKey: return 'navigateonkey';
      case A11yAttributeType.NavigateByHierarchy: return 'navigatebyhierarchy';
      case A11yAttributeType.NavigationMode: return 'mode';
      case A11yAttributeType.NavigationModeParameters: return 'modeparams';

      default: throw new Error(`Undefined string for attribute type: ${type}`);
    }
  }

  constructor(appPrefix: string, type: A11yAttributeType, params?: string[], value?: string) {
    this._appPrefix = appPrefix;
    this._type = type;
    this._params = params;
    this._value = value;
  }

  /**
   * The attribute name that should be set on the element
   * The format of the name is <prefix>-<type>-<param1>-<param2>-...
   * For example: data-a11y-nextfocusonkey-9
   */
  public get name(): string {
    let name: string = this.prefix;
    if (this._params && this._params.length > 0) {
      const params: string = this._params.join('-');
      name += `-${params}`;
    }
    return name;
  }

  /**
   * The attribute prefix (The name without parameters)
   */
  public get prefix(): string {
    return A11yAttribute.getPrefix(this._appPrefix, this._type);
  }

  /**
   * The attribute value
   */
  public get value(): string | undefined {
    return this._value;
  }

  /**
   * The attribute type
   */
  public get type(): A11yAttributeType {
    return this._type;
  }

  /**
   * The attribute parameters extracted from its name
   *
   * Example: data-a11y-type-p1-p2-p3 => ['p1','p2','p3']
   */
  public get params(): string[] {
    return this._params || [];
  }

  /**
   * Set the attibute (name and value) on the given HTML element
   */
  public setOnElement(element: HTMLElement): void {
    element.setAttribute(this.name, this.value || '');
  }
}
