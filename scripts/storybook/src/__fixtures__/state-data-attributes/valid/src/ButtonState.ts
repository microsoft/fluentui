/**
 * State for Button component.
 */
export type ButtonState = {
  /**
   * Root element slot.
   */
  root: {
    /**
     * Whether the button is disabled and aria-disabled is set.
     */
    'data-disabled'?: 'true' | 'false';

    /**
     * Visual appearance of the button.
     */
    'data-appearance': 'primary' | 'secondary' | 'outline';

    /**
     * Not a data attribute — should be excluded.
     */
    className?: string;

    /**
     * Also not a data attribute.
     */
    id?: string;
  };

  /**
   * Icon slot — no data-* attrs; should not contribute to root output.
   */
  icon?: {
    className?: string;
  };
};
