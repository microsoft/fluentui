import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * A DrawerSwitcherToggleButton Component to be used with DrawerSwitcher.
 *
 * @slot - The default slot for the drawer-toggle content
 *
 * @public
 */
export class DrawerSwitcherToggleButton extends FASTElement {
  /**
   * When true, the control will be immudrawer-togglele by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;
}
