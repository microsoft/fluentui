import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utils';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps<HTMLElement>;
}

export interface MenuItemState extends MenuItemProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandProps<HTMLSpanElement>;
}
