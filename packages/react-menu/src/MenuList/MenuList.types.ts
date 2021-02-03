import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

export interface MenuListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  onCheckedValuesChange?: (name: string, value: string[]) => void;

  checkedValues?: Record<string, string[]>;
}

export interface MenuListState extends MenuListProps {}
