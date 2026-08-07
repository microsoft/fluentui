/**
 * Toggle button state — exported under two public *State names.
 */
export type ToggleButtonState = {
  root: {
    /** Whether the toggle is pressed. */
    'data-pressed'?: boolean;
  };
};

/**
 * Re-exported under a second *State name to verify both keys are emitted.
 */
export type PrimaryToggleButtonState = ToggleButtonState;
