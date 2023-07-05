import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * A DrawerToggle Component to be used with {@link @microsoft/fast-foundation#(DrawerToggles:class)}
 *
 * @slot start - Content which can be provided before the drawer-toggle content
 * @slot end - Content which can be provided after the drawer-toggle content
 * @slot - The default slot for the drawer-toggle content
 *
 * @public
 */
export class DrawerToggle extends FASTElement {
  /**
   * When true, the control will be immudrawer-togglele by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;
}
