import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends ComponentState, React.HTMLAttributes<HTMLElement> {
  ref: React.Ref<HTMLElement>;
}
