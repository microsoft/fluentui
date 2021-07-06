import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuDivider}
 */
export type MenuDividerProps = ComponentPropsCompat & React.HTMLAttributes<HTMLElement>;

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends MenuDividerProps {
  ref: React.MutableRefObject<HTMLElement>;
}
