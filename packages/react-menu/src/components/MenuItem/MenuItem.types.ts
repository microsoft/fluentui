import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectSlotProp } from '@fluentui/react-utils';
import { RefObjectFunction } from '@fluentui/react-hooks';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps;
}

export interface MenuItemState extends MenuItemProps {
  /**
   * Ref to the root slot
   */
  ref: RefObjectFunction<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectSlotProp<HTMLSpanElement>; // TODO use correct props when there is a converged icon pkg
}
