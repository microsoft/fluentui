import { attr, FASTElement } from '@microsoft/fast-element';

import type { Option } from '../option/option.js';
import { toggleState } from '../utils/element-internals.js';

export abstract class AbstractListbox extends FASTElement {
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

  /**
   *
   * Whether multiple options can be selected.
   * @public
   * @remarks
   * HTML Attribute: `multiple`
   */
  @attr({ mode: 'boolean' })
  public multiple = false;
  protected multipleChanged() {
    this.elementInternals.ariaMultiSelectable = this.multiple.toString();
    this.toggleOptionsMultipleState();
  }

  /**
   * An array of Option elements.
   * @public
   */
  public abstract readonly options: Option[];
  protected optionsChanged() {
    this.toggleOptionsMultipleState();
  }

  constructor() {
    super();

    this.elementInternals.role = 'listbox';
    this.elementInternals.ariaMultiSelectable = this.multiple.toString();
  }

  connectedCallback() {
    super.connectedCallback();

    // @ts-expect-error Popover API
    this.popover = 'auto';
  }

  private toggleOptionsMultipleState() {
    if (!this.options) {
      return;
    }

    for (const option of this.options) {
      if (!option.elementInternals) {
        continue;
      }
      toggleState(option.elementInternals, 'multiple', this.multiple);
    }
  }
}
