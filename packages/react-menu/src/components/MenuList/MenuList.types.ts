import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';
import { RefObjectFunction } from '@fluentui/react-hooks';

export interface MenuListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

export interface MenuListState extends MenuListProps {
  /**
   * Ref to the root slot
   */
  ref: RefObjectFunction<HTMLElement>;
}
