import { IRawStyle } from '@uifabric/merge-styles';

/**
 * @internal
 * Experimental interface for decorative styling in a theme.
 */
export interface IEffects {
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: cards, grid items
   */
  elevation4: IRawStyle;
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: menus, command surfaces
   */
  elevation8: IRawStyle;
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: search result dropdowns, hover cards, tooltips, help bubbles
   */
  elevation16: IRawStyle;
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: Panels, Dialogs
   */
  elevation64: IRawStyle;

  /**
   * How much corners should be rounded, for use with border-radius.
   */
  roundedCorner2: number;
}
