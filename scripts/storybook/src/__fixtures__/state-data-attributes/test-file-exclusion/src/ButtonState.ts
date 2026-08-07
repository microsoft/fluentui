/** The legitimate state declaration — the only file that should be inspected. */
export type ButtonState = {
  root: {
    /** Whether the button is disabled. */
    'data-disabled'?: 'true' | 'false';
  };
};
