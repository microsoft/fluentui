import { ComponentProps, ShorthandValue, SizeValue } from '../utils/commonTypes';

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
  icon?: ShorthandValue<{}>;

  /**
   * Size multiplier.
   */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';
}

export type StatusState = StatusProps;
