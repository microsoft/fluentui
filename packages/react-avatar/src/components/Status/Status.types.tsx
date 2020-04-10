import { SizeValue } from '@fluentui/react-northstar';
import { ComponentProps, ShorthandValue } from '../temp/commonTypes';
import { BoxProps } from '../Box/index';
import { ComposeOptions, ComposeStandardStatics } from '../temp/compose';

// tslint:disable-next-line:no-any
export interface StatusProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Renders the status using a custom color to be inlined using  `style`.
   * Note: May want to deprecate in favor of variables.
   */
  color?: string;

  /**
   * Shorthand icon. A shorthand prop can be a literal, object,
   * JSX, or function which takes render options.
   */
  icon?: ShorthandValue<BoxProps>;

  /**
   * Size multiplier.
   */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';
}

export interface StatusSlots {
  icon: React.ElementType;
}

export type StatusSlotProps = {
  [key in keyof StatusSlots]: StatusProps[key];
};

export interface StatusOptions
  extends ComposeOptions<StatusProps, StatusSlots, StatusSlotProps, ComposeStandardStatics> {}
