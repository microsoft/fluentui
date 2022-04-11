import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Types of Tab size.
 * @public
 */
export type TabSize = 'small' | 'medium';

/**
 * A Tab Component to be used with {@link @microsoft/fast-foundation#(Tabs:class)}
 * @public
 */
export class Tab extends FASTElement {
  /**
   * When true, the control will be immutable by user interaction.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean;

  /**
   * The size the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public size: TabSize = 'medium';
}
