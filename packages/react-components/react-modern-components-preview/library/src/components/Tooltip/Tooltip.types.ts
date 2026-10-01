import type {
  TooltipProps as TooltipBaseProps,
  TooltipState as TooltipBaseState,
} from '@fluentui/react-headless-components-preview/tooltip';
export type {
  OnVisibleChangeData,
  TooltipSlots,
  TooltipTriggerProps,
} from '@fluentui/react-headless-components-preview/tooltip';

export type TooltipProps = TooltipBaseProps & {
  /**
   * The tooltip's visual appearance.
   *
   * @default 'normal'
   */
  appearance?: 'normal' | 'inverted';
};

export type TooltipState = TooltipBaseState & {
  appearance: NonNullable<TooltipProps['appearance']>;
  content: TooltipBaseState['content'] & {
    'data-appearance': NonNullable<TooltipProps['appearance']>;
  };
};
