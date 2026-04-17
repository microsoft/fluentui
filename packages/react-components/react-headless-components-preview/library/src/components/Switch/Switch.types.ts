import type { SwitchSlots as SwitchBaseSlots, SwitchBaseProps, SwitchBaseState } from '@fluentui/react-switch';

/**
 * Switch component slots
 */
export type SwitchSlots = SwitchBaseSlots;

/**
 * Switch component props
 */
export type SwitchProps = SwitchBaseProps;

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
  };
};
