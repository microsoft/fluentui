import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TooltipProps } from '@fluentui/react-tooltip';

export type InfoIconSlots = {
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
 * InfoIcon Props
 */
export type InfoIconProps = ComponentProps<Partial<InfoIconSlots>> & {
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
 * State used in rendering InfoIcon
 */
export type InfoIconState = ComponentState<InfoIconSlots> &
  Required<Pick<InfoIconProps, 'size'>> & {
    open: boolean;
  };
