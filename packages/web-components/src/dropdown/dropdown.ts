import { attr, FASTElement } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities'; 
import { DropdownList } from '../dropdown-list/dropdown-list.js';

/**
 * Base class for a Dropdown custom element.
 *
 * @public
 */
export class BaseDropdown extends FASTElement {
  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  private anchorPositioningStyleSheet = new CSSStyleSheet();
  private anchorId = uniqueId('fluent-dropdown-anchor-');
  private anchorName = `--${this.anchorId}`;

  private clickEventListener!: EventListener;

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled = false;
  protected disabledChanged() {
    this.setDisabledSideEffect(this.disabled);
  }

  /**
   * Associates the component with a DropdownList element. The value references the DropdownList
   * element’s ID.
   *
   * @public
   * @remarks
   * HTML Attribute: `list`
   */
  @attr
  public list?: string;
  protected listChanged(prev: string | undefined, next: string | undefined) {
    if (prev) {
      const prevListElement = document.getElementById(prev) as DropdownList;
      if (prevListElement) {
        // @ts-expect-error Current Typescript doesn't support Popover API
        prevListElement.hidePopover();
        prevListElement.combobox = null;
      }
    }

    if (next) {
      this.setList();
    }
  }

  /**
   * The associated DropdownList element.
   *
   * @public
   */
  public get listElement(): null | DropdownList {
    if (!this.list || typeof this.list !== 'string') {
      return null;
    }

    const el = document.getElementById(this.list);

    return el instanceof DropdownList ? el : null;
  }

  constructor() {
    super();

    this.elementInternals.role = 'combobox';
    this.elementInternals.ariaExpanded = 'false';
  }

  connectedCallback() {
    super.connectedCallback();

    this.dataset.anchorid = this.anchorId;
    this.setList();
    this.bindEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.unbindEvents();
  }

  formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
  }

  /**
   * @internal
   */
  public handleClick() {
    // @ts-expect-error Current Typescript doesn't support Popover API
    this.listElement?.togglePopover();
  }

  private bindEvents() {
    this.clickEventListener = this.handleClick.bind(this);
    this.addEventListener('click', this.clickEventListener);
  }

  private unbindEvents() {
    if (this.clickEventListener) {
      this.removeEventListener('click', this.clickEventListener);
    }
  }

  private setDisabledSideEffect(disabled: boolean) {
    this.elementInternals.ariaDisabled = `${disabled}`;
  }

  private setList() {
    if (!this.list || !this.listElement) {
      return;
    }

    this.setAttribute('aria-controls', this.list);
    this.listElement.combobox = this;
    this.setAnchorPositioningCSS();
  }

  private setAnchorPositioningCSS() {
    if (!this.listElement) {
      return;
    }

    if (!document.adoptedStyleSheets.includes(this.anchorPositioningStyleSheet)) {
      document.adoptedStyleSheets.push(this.anchorPositioningStyleSheet);
    }

    const css = `
      [data-anchorid="${this.anchorId}"] {
        anchor-name: ${this.anchorName};
      }
      #${this.listElement.id} {
        left: anchor(${this.anchorName} left);
        top: anchor(${this.anchorName} bottom);
      }
    `;

    this.anchorPositioningStyleSheet.replaceSync(css);
  }
}

/**
 * A Dropdown custom element.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {}
