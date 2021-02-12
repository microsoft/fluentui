import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';
import { SizeValue } from '@fluentui/theme';

export type BadgeStatus =
  | 'success'
  | 'warning'
  | 'severe'
  | 'accent'
  | 'danger'
  | 'important'
  | 'informative'
  | 'subtle';

export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** A Badge can be sized. */
  size?: SizeValue;

  /** A Badge can have status styles variants */
  status?: BadgeStatus;

  /** A Badge can have different colors. */
  color?: string;

  /** A Badge can have rounded conners */
  rounded?: boolean;

  /** A Badge can be circular */
  circular?: boolean;

  /** A Badge can be filled */
  filled?: boolean;

  /** A Badge can be outline */
  outline?: boolean;

  /** A Badge can be ghost */
  ghost?: boolean;

  /** A Badge can be inverted */
  inverted?: boolean;

  /** A Badge can be tint */
  tint?: boolean;
}

export interface BadgeState extends BadgeProps {
  ref: React.MutableRefObject<HTMLElement>
}
