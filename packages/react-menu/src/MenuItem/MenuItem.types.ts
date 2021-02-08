import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utils';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps;
}

export interface MenuItemState extends MenuItemProps {}
