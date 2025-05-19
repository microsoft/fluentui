import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { labelElementTemplate } from './label.template.js';

/**
 * The base class used for constructing a fluent-label custom element
 *
 * @tag fluent-label
 *
 * @public
 */
export class BaseLabel extends FASTElement {
  /**
   * 	Specifies styles for label when associated input is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * The label's for attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: `for`
   */
  @attr({ attribute: 'for' })
  public htmlFor!: string;

  /**
   * 	Specifies styles for label when associated input is a required field
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;

  /**
   * The default slotted content.
   *
   * @public
   */
  @observable
  defaultSlottedContent!: Node[];

  /**
   * Ensures that a label element is present in the light DOM. It may be a child or parent of this element.
   *
   * @param prev - The previous list of slotted content
   * @param next - The current list of slotted content
   * @public
   *
   * @remarks
   * If a `<label>` element is not present when connected, one will be created and inserted into the light DOM, and all
   * slotted content will be moved into the element.
   */
  defaultSlottedContentChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    const labelElement =
      this.closest('label') ??
      next?.find<HTMLLabelElement>((x): x is HTMLLabelElement => x instanceof HTMLLabelElement);

    if (labelElement) {
      this.labelElement = labelElement;
      return;
    }

    if (next?.length) {
      this.insertLabel();
    }
  }

  /**
   * Reference to the associated label element.
   *
   * @public
   */
  @observable
  public labelElement!: HTMLLabelElement;

  /**
   * Redirects `click` events to the label element.
   *
   * @param e - The event object
   * @public
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this.disabled) {
      return;
    }

    if (this === e.target) {
      this.labelElement.click();
    }

    return true;
  }

  /**
   * Renders the label element and inserts all slotted content into the label.
   *
   * @public
   * @remarks
   * This method is called when the label element is not present in the light DOM, either as a child or parent of this
   * element. This method can be overridden in derived classes to provide a custom label element or to disable the
   * behavior entirely.
   */
  protected insertLabel(): void {
    labelElementTemplate.render(this, this);
    this.labelElement.prepend(...this.defaultSlottedContent.filter(x => x !== this.labelElement));
  }
}
