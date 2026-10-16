import { attr, Observable } from '@microsoft/fast-element';
import { BaseTextArea } from './textarea.base.js';
import type { TextAreaAppearance, TextAreaSize } from './textarea.options.js';

/**
 * The Fluent TextArea Element.
 *
 * @tag fluent-text-area
 * @presentational {TextAreaAppearance} [appearance=outline] - Indicates the visual appearance of the element.
 * @presentational {boolean} block - Indicates whether the textarea should be a block-level element.
 *
 */
export class TextArea extends BaseTextArea {
  protected labelSlottedNodesChanged() {
    super.labelSlottedNodesChanged();

    this.labelSlottedNodes.forEach(node => {
      if (this.size) {
        node.setAttribute('size', this.size);
      } else {
        node.removeAttribute('size');
      }
    });
  }

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
          if (this.size) {
            node.setAttribute('size', this.size);
          } else {
            node.removeAttribute('size');
          }
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
