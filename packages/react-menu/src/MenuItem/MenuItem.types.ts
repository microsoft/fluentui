import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utils';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  icon?: ShorthandProps;

  checkmark?: ShorthandProps;
}

export interface MenuItemState extends MenuItemProps {
  ref?: React.RefObject<HTMLDivElement>;
}
