/**
 * Experimental interface for decorative styling in a theme.
 * {@docCategory IEffects}
 */
export interface IEffects {
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: cards, grid items
   */
  elevation4: string;
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: menus, command surfaces
   */
  elevation8: string;
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: search result dropdowns, hover cards, tooltips, help bubbles
   */
  elevation16: string;
  /**
   * Used to provide a visual affordance that this element is elevated above the surface it rests on.
   * This is lower than elevations with a higher value, and higher than elevations with a lower value.
   * Used for: Panels, Dialogs
   */
  elevation64: string;

  /**
   * Rounded corner value, for use with border-radius. Smaller values indicate less rounding.
   * Smaller elements should get less rounding than larger elements.
   * Used for: buttons
   */
  roundedCorner2: string;
  /**
   * Rounded corner value, for use with border-radius. Smaller values indicate less rounding.
   * Smaller elements should get less rounding than larger elements.
   * Used for: cards
   */
  roundedCorner4: string;
  /**
   * Rounded corner value, for use with border-radius. Smaller values indicate less rounding.
   * Smaller elements should get less rounding than larger elements.
   * Used for: surfaces
   */
  roundedCorner6: string;
}
