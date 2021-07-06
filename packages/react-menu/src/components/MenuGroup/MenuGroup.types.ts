import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuGroup}
 */
export type MenuGroupProps = ComponentPropsCompat & React.HTMLAttributes<HTMLElement>;

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupState extends MenuGroupProps {
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
}
