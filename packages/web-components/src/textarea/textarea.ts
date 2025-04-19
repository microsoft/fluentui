import { attr, Observable } from '@microsoft/fast-element';
import { BaseTextArea } from './textarea.base.js';
import { TextAreaAppearance, TextAreaSize } from './textarea.options.js';

/**
 * The Fluent TextArea Element.
 *
 * @tag fluent-text-area
 *
 */
export class TextArea extends BaseTextArea {
  protected labelSlottedNodesChanged() {
    super.labelSlottedNodesChanged();

    this.labelSlottedNodes.forEach(node => {
      node.size = this.size;
    });
  }

  /**
   * Indicates the visual appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr({ mode: 'fromView' })
  public appearance: TextAreaAppearance = TextAreaAppearance.outline;

  /**
   * Indicates whether the textarea should be a block-level element.
   *
   * @public
   * @remarks
   * HTML Attribute: `block`
   */
  @attr({ mode: 'boolean' })
  public block: boolean = false;

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: TextAreaSize;

  /**
   * @internal
   */
  public handleChange(_: any, propertyName: string) {
    switch (propertyName) {
      case 'size':
        this.labelSlottedNodes.forEach(node => {
          node.size = this.size;
        });
        break;
    }
  }

  /**
   * @internal
   */
  public connectedCallback() {
    super.connectedCallback();

    Observable.getNotifier(this).subscribe(this, 'size');
  }

  /**
   * @internal
   */
  public disconnectedCallback() {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this, 'size');
  }
}
