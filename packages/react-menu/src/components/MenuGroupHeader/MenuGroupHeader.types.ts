import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuGroupHeader}
 */
export type MenuGroupHeaderProps = ComponentPropsCompat & React.HTMLAttributes<HTMLElement>;

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends MenuGroupHeaderProps {
  ref: React.MutableRefObject<HTMLElement>;
}
