import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends ComponentState, React.HTMLAttributes<HTMLElement> {
  ref: React.Ref<HTMLElement>;
}
