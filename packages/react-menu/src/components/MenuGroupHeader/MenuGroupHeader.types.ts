import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

/**
 * {@docCategory MenuGroupHeader}
 */
export type MenuGroupHeaderProps = ComponentProps & React.HTMLAttributes<HTMLElement> & {};

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends MenuGroupHeaderProps {
  ref?: React.MutableRefObject<HTMLElement>;
}
