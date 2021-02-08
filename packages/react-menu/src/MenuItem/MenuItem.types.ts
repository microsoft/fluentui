import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utils';
import { ObjectSlotProp } from '../../../react-compose/lib/types';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps;
}

export interface MenuItemState extends MenuItemProps {
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectSlotProp<HTMLSpanElement>; // TODO use correct props when there is a converged icon pkg
}
