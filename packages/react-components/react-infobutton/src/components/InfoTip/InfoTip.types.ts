import type { TooltipProps } from '@fluentui/react-tooltip';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoTipSlots = {
  /**
   * Root slot that wraps the icon.
   */
  root: NonNullable<Slot<'span'>>;

  /**
   * The Tooltip slot that wraps the icon. Use this to pass props to the Tooltip.
   */
  tooltip: NonNullable<Slot<Partial<TooltipProps>>>;
};

/**
 * InfoTip Props
 */
export type InfoTipProps = ComponentProps<Partial<InfoTipSlots>> & {
  /**
   * Size of the InfoTip.
   *
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The information to be displayed in the tooltip.
   */
  info?: TooltipProps['content'];
};

/**
 * State used in rendering InfoTip
 */
export type InfoTipState = ComponentState<InfoTipSlots> &
  Required<Pick<InfoTipProps, 'size'>> & {
    open: boolean;
  };
