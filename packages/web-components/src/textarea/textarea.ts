import { attr, Observable } from '@microsoft/fast-element';
import { hasMatchingState, swapStates, toggleState } from '../utils/element-internals.js';
import { BaseTextArea } from './textarea.base.js';
import { TextAreaAppearance, TextAreaAppearancesForDisplayShadow, TextAreaSize } from './textarea.options.js';

/**
 * A TextArea Custom HTML Element.
 * Based on BaseTextArea and includes style and layout specific attributes
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
  protected appearanceChanged(prev: TextAreaAppearance | undefined, next: TextAreaAppearance | undefined) {
    toggleState(this.elementInternals, prev, false);

    if (hasMatchingState(TextAreaAppearance, next)) {
      toggleState(this.elementInternals, next, true);
    } else {
      this.appearance = TextAreaAppearance.outline;
    }
  }

  /**
   * Indicates whether the textarea should be a block-level element.
   *
   * @public
   * @remarks
   * HTML Attribute: `block`
   */
  @attr({ mode: 'boolean' })
  public block: boolean = false;
  protected blockChanged() {
    toggleState(this.elementInternals, 'block', this.block);
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
  protected sizeChanged(prev: TextAreaSize | undefined, next: TextAreaSize | undefined) {
    swapStates(this.elementInternals, prev, next, TextAreaSize);
  }

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
      case 'appearance':
      case 'displayShadow':
        this.maybeDisplayShadow();
        break;
    }
  }

  /**
   * @internal
   */
  public connectedCallback() {
    super.connectedCallback();

    this.maybeDisplayShadow();

    Observable.getNotifier(this).subscribe(this, 'appearance');
    Observable.getNotifier(this).subscribe(this, 'displayShadow');
    Observable.getNotifier(this).subscribe(this, 'size');
  }

  /**
   * @internal
   */
  public disconnectedCallback() {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this, 'appearance');
    Observable.getNotifier(this).unsubscribe(this, 'displayShadow');
    Observable.getNotifier(this).unsubscribe(this, 'size');
  }

  private maybeDisplayShadow() {
    toggleState(
      this.elementInternals,
      'display-shadow',
      this.displayShadow && TextAreaAppearancesForDisplayShadow.includes(this.appearance),
    );
  }
}
