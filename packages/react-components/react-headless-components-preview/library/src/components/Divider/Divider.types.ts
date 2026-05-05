import type { DividerSlots as DividerBaseSlots, DividerBaseProps, DividerBaseState } from '@fluentui/react-divider';

export type DividerSlots = DividerBaseSlots;

export type DividerProps = DividerBaseProps;

export type DividerState = DividerBaseState & {
  root: {
    /**
     * Data attribute set to indicate the orientation of the divider.
     */
    'data-orientation'?: 'vertical' | 'horizontal';
  };
};
