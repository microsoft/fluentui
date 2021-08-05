import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupState extends ComponentState, React.HTMLAttributes<HTMLElement> {
  ref: React.Ref<HTMLElement>;

  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
}
