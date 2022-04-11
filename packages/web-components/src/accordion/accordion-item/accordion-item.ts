import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';

export type AccordionItemSize = 'small' | 'medium' | 'large' | 'extra-large';
/**
 * An individual item in an Accordion.
 * @public
 */
export class AccordionItem extends FASTElement {
  /**
   * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
   * heading element.
   *
   * @defaultValue 2
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
   * An accordion item can have different sizes
   *
   * @public
   * @remarks
   * HTML attribute: size
   */
  @attr
  public size: AccordionItemSize;

  /**
   * Expand Icon Position
   *
   * @public
   * @remarks
   * HTML attribute: expand-icon-position
   */
  @attr({ attribute: 'expand-icon-position' })
  public expandIconPosition: 'start' | 'end';

  /**
   * The item ID
   *
   * @public
   * @remarks
   * HTML Attribute: id
   */
  @attr
  public id: string;

  /**
   * @internal
   */
  public expandbutton: HTMLElement;

  /**
   * @internal
   */
  public clickHandler = (e: MouseEvent) => {
    this.expanded = !this.expanded;
    this.change();
  };

  private change = (): void => {
    this.$emit('change');
  };
}
