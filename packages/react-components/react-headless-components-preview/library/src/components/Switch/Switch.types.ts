import type { SwitchBaseState } from '@fluentui/react-switch';

export type { SwitchSlots, SwitchBaseProps as SwitchProps } from '@fluentui/react-switch';

/**
 * Switch component state
 */
export type SwitchState = SwitchBaseState & {
  root: {
    /**
     * Data attribute set when the switch is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the switch is disabled but still focusable.
     */
    'data-disabled-focusable'?: string;

    /**
     * Data attribute set when the switch is checked (controlled mode only).
     */
    'data-checked'?: string;

    /**
     * Data attribute reflecting the label position.
     */
    'data-label-position'?: SwitchBaseState['labelPosition'];
  };
};
