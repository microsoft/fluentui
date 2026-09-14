import type { LabelBaseState } from '@fluentui/react-label';

export type { LabelSlots, LabelBaseProps as LabelProps } from '@fluentui/react-label';

/**
 * Label component state
 */
export type LabelState = LabelBaseState & {
  root: {
    /**
     * Data attribute set when the label is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the required indicator is rendered.
     */
    'data-required'?: string;
  };
};
