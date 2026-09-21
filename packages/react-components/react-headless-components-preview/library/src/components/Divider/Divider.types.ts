import type { DividerBaseState } from '@fluentui/react-divider';

export type { DividerSlots, DividerBaseProps as DividerProps } from '@fluentui/react-divider';

export type DividerState = DividerBaseState & {
  root: {
    /**
     * Data attribute set to indicate the orientation of the divider.
     */
    'data-orientation'?: 'vertical' | 'horizontal';
  };
};
