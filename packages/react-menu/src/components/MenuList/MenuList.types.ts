import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

export interface MenuListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

export interface MenuListState extends MenuListProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
