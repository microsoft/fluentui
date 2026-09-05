import type { SwitchBaseState } from '@fluentui/react-switch';

export type { SwitchSlots, SwitchBaseProps as SwitchProps } from '@fluentui/react-switch';

/**
 * Switch component state
 */
export type SwitchState = SwitchBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when disabled but still focusable; omitted otherwise.
     */
    'data-disabled-focusable'?: string;

    /**
     * Present when checked in controlled mode; omitted when unchecked or uncontrolled.
     */
    'data-checked'?: string;

    /**
     * Data attribute reflecting the label position.
     */
    'data-label-position'?: SwitchBaseState['labelPosition'];
  };
};
