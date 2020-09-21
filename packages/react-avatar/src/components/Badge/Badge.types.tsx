import * as React from 'react';
import { ComponentProps, ShorthandValue, SizeValue } from '../utils/commonTypes';

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
  tokens?: BadgeTokenSet;
}

/**
 * Style tokens for Badge
 */
export type BadgeTokenSet = {
  size?: string;
  glowColor?: string;
  glowWidth?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  color?: string;
  iconColor?: string;
};

export type BadgeState = BadgeProps;
