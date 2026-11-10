import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { getInitials } from '../utils/get-initials.js';

/**
 * The base class used for constructing a fluent-avatar custom element
 * @public
 */
export class BaseAvatar extends FASTElement {
  /**
   * Reference to the default slot element.
   *
   * @internal
   */
  @observable
  public defaultSlot!: HTMLSlotElement;

  /**
   * Handles changes to the default slot element reference.
   *
   * Toggles the `has-slotted` class on the slot element for browsers that do not
   * support the `:has-slotted` CSS selector. Defers cleanup using
   * `Updates.enqueue` to avoid DOM mutations during hydration that could
   * corrupt binding markers.
   *
   * @internal
   */
  public defaultSlotChanged() {
    if (!CSS.supports('selector(:has-slotted)')) {
      const elements = this.defaultSlot.assignedElements();
      this.defaultSlot.classList.toggle('has-slotted', elements.length > 0);
    }

    Updates.enqueue(() => {
      this.cleanupSlottedContent();
    });
  }

  /**
   * Reference to the monogram element that displays generated initials.
   *
   * @internal
   */
  @observable
  public monogram!: HTMLElement;

  /**
   * Updates the monogram text content when the ref is captured.
   *
   * @internal
   */
  protected monogramChanged() {
    this.updateMonogram();
  }

  /**
   * The slotted content nodes assigned to the default slot.
   *
   * @internal
   */
  @observable
  public slottedDefaults: Node[] = [];

  /**
   * Handles changes to the slotted default content.
   *
   * Normalizes the DOM, toggles the `has-slotted` class on the default slot element
   * for browsers that do not support the `:has-slotted` CSS selector, and removes
   * empty text nodes from the default slot to keep the DOM clean.
   *
   * @internal
   */
  protected slottedDefaultsChanged() {
    if (!this.defaultSlot) {
      return;
    }
    this.cleanupSlottedContent();
  }

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public name?: string | undefined;

  /**
   * Handles changes to the name attribute.
   * @internal
   */
  protected nameChanged() {
    this.updateMonogram();
  }

  /**
   * Provide custom initials rather than one generated via the name
   *
   * @public
   * @remarks
   * HTML Attribute: initials
   */
  @attr
  public initials?: string | undefined;

  /**
   * Handles changes to the initials attribute.
   * @internal
   */
  protected initialsChanged() {
    this.updateMonogram();
  }

  constructor() {
    super();

    this.elementInternals.role = 'img';
  }

  /**
   * Generates and sets the initials for the template.
   * Subclasses should override this to provide custom initials logic.
   *
   * @internal
   */
  public generateInitials(): string | void {
    return this.initials || getInitials(this.name, window.getComputedStyle(this).direction === 'rtl');
  }

  /**
   * Updates the monogram element's text content with the generated initials.
   *
   * @internal
   */
  protected updateMonogram(): void {
    if (this.monogram) {
      this.monogram.textContent = this.generateInitials() ?? '';
    }
  }

  /**
   * Normalizes the DOM and removes empty text nodes from the default slot.
   *
   * @internal
   */
  protected cleanupSlottedContent(): void {
    this.normalize();

    if (!CSS.supports('selector(:has-slotted)')) {
      this.defaultSlot.classList.toggle('has-slotted', !!this.slottedDefaults.length);
    }

    if (!this.innerText.trim()) {
      this.slottedDefaults.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          (node as ChildNode).remove();
        }
      });
    }
  }
}
