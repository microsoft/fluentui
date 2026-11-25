import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';

/**
 *
 * @slot start - Content positioned before heading in the collapsed state
 * @slot heading - Content which serves as the accordion item heading and text of the expand button
 * @slot - The default slot for accordion item content
 * @slot marker-expanded - The expanded icon
 * @slot marker-collapsed - The collapsed icon
 * @csspart heading - Wraps the button
 * @csspart button - The button which serves to invoke the item
 * @csspart content - The wrapper for the accordion item content
 *
 * @public
 */
export class BaseAccordionItem extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
   * heading element.
   *
   * @public
   * @remarks
   * HTML attribute: heading-level
   */
  @attr({
    attribute: 'heading-level',
    mode: 'fromView',
    converter: nullableNumberConverter,
  })
  public headinglevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;

  /**
   * Expands or collapses the item.
   *
   * @public
   * @remarks
   * HTML attribute: expanded
   */
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  /**
   * Disables an accordion item
   *
   * @public
   * @remarks
   * HTML attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * @internal
   */
  @observable
  public expandbutton!: HTMLElement;
}
