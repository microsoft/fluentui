import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';

/**
 * {@docCategory MenuItemRadio}
 */
export interface MenuItemRadioProps extends ComponentProps, React.HTMLAttributes<HTMLElement>, MenuItemSelectableProps {
  icon?: ShorthandProps<HTMLElement>;

  checkmark?: ShorthandProps<HTMLElement>;
}

/**
 * {@docCategory MenuItemRadio}
 */
export interface MenuItemRadioState extends MenuItemRadioProps, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Icon slot rendered before children content
   */
  icon?: ObjectShorthandProps<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark: ObjectShorthandProps<HTMLElement>;
}
