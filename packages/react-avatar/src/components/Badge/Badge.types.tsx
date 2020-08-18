import { ComponentProps, ShorthandValue, SizeValue } from '../utils/commonTypes';

// tslint:disable-next-line:no-any
export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Renders the badge using a custom color to be inlined using  `style`.
   * Note: May want to deprecate in favor of variables.
   */
  color?: string;

  /**
   * Shorthand icon. A shorthand prop can be a literal, object,
   * JSX, or function which takes render options.
   */
  icon?: ShorthandValue<{}>;

  /**
   * Size multiplier.
   */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';

  /** Style tokens */
  tokens?: BadgeTokens;
}

/**
 * Style tokens for Badge
 */
export type BadgeTokens = {
  size?: string;
  borderColor?: string;
  borderWidth?: string;
  backgroundColor?: string;
  textColor?: string;
};

export type BadgeState = BadgeProps;
