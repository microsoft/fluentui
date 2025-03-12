import { attr } from '@microsoft/fast-element';
import { isListbox } from '../listbox/listbox.options.js';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { BaseDropdown } from './dropdown.base.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';

/**
 * The Fluent Dropdown Element. Implements {@link @microsoft/fast-foundation#BaseDropdown}.
 *
 * @slot - The default slot. Accepts a {@link (Listbox:class)} element.
 * @slot indicator - The indicator slot.
 * @slot control - The control slot. This slot is automatically populated and should not be manually manipulated.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {
  /**
   * Static property for the anchor positioning fallback observer. The observer is used to flip the listbox when it is
   * out of view.
   * @remarks This is only used when the browser does not support CSS anchor positioning.
   * @internal
   */
  private static AnchorPositionFallbackObserver: IntersectionObserver;

  /**
   * The appearance of the dropdown.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance: DropdownAppearance = DropdownAppearance.outline;

  /**
   * Swaps appearance states when the appearance property changes.
   *
   * @param prev - the previous appearance state
   * @param next - the current appearance state
   * @internal
   */
  public appearanceChanged(prev: DropdownAppearance | undefined, next: DropdownAppearance | undefined): void {
    swapStates(this.elementInternals, prev, next, DropdownAppearance);
  }

  /**
   * The size of the dropdown.
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: DropdownSize;

  /**
   * Swaps size states when the size property changes.
   *
   * @param prev - the previous size state
   * @param next - the current size state
   * @internal
   */
  public sizeChanged(prev: DropdownSize | undefined, next: DropdownSize | undefined): void {
    swapStates(this.elementInternals, prev, next, DropdownSize);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.anchorPositionFallback();
  }

  constructor() {
    super();

    this.addEventListener('connected', this.listboxConnectedHandler);
  }

  disconnectedCallback(): void {
    Dropdown.AnchorPositionFallbackObserver?.unobserve(this.listbox);

    super.disconnectedCallback();
  }

  /**
   * Handles the connected event for the listbox.
   *
   * @param e - the event object
   * @internal
   */
  private listboxConnectedHandler(e: Event): void {
    const target = e.target as HTMLElement;

    if (isListbox(target)) {
      this.listbox = target;
    }
  }

  /**
   * Adds or removes the window event listener based on the open state.
   *
   * @param prev - the previous open state
   * @param next - the current open state
   * @internal
   */
  public openChanged(prev: boolean | undefined, next: boolean | undefined): void {
    super.openChanged(prev, next);

    if (next) {
      Dropdown.AnchorPositionFallbackObserver?.observe(this.listbox);
      return;
    }

    Dropdown.AnchorPositionFallbackObserver?.unobserve(this.listbox);
  }

  /**
   * When anchor positioning isn't supported, an intersection observer is used to flip the listbox when it hits the
   * viewport bounds. One static observer is used for all dropdowns.
   *
   * @internal
   */
  private anchorPositionFallback(): void {
    Dropdown.AnchorPositionFallbackObserver =
      Dropdown.AnchorPositionFallbackObserver ??
      new IntersectionObserver(
        (entries: IntersectionObserverEntry[]): void => {
          entries.forEach(({ boundingClientRect, isIntersecting, target }) => {
            if (isListbox(target) && !isIntersecting) {
              if (boundingClientRect.bottom > window.innerHeight) {
                toggleState(target.dropdown!.elementInternals, 'flip-block', true);
                return;
              }

              if (boundingClientRect.top < 0) {
                toggleState(target.dropdown!.elementInternals, 'flip-block', false);
              }
            }
          });
        },
        { threshold: 1 },
      );
  }
}
