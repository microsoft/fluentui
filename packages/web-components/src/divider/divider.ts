import { attr, observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { DividerAlignContent, DividerAppearance } from './divider.options.js';
import { BaseDivider } from './divider.base.js';

/**
 * A Divider Custom HTML Element.
 * Based on BaseDivider and includes style and layout specific attributes
 *
 * @tag fluent-divider
 *
 * @public
 */
export class Divider extends BaseDivider {
  /** @internal */
  @observable
  public defaultSlot!: HTMLSlotElement;

  /** @internal */
  public defaultSlotChanged(): void {
    this.handleSlotChange();
  }

  /** @internal */
  public handleSlotChange(): void {
    const hasContent = this.defaultSlot
      .assignedNodes()
      .some(
        node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim()),
      );
    toggleState(this.elementInternals, 'empty', !hasContent);
  }

  /**
   * @public
   * @remarks
   * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: DividerAlignContent;

  /**
   * @public
   * @remarks
   * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
   */
  @attr
  public appearance?: DividerAppearance;

  /**
   * @public
   * @remarks
   * Adds padding to the beginning and end of the divider.
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;
}
