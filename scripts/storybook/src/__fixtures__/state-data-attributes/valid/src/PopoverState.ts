/**
 * Base headless state — carries shared data-* attributes.
 */
export type BaseState = {
  root: {
    /**
     * Whether the component is open.
     */
    'data-open'?: 'true' | 'false';
  };
};

/**
 * Extended state that intersects with BaseState.
 */
export type PopoverState = BaseState & {
  root: {
    /**
     * Placement of the popover.
     */
    'data-placement': 'before' | 'after';

    /** Non-data prop — should be excluded. */
    tabIndex?: number;
  };
};
