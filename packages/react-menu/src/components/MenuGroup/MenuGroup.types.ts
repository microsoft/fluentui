import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

/**
 * {@docCategory MenuGroup}
 */
export type MenuGroupProps = ComponentProps & React.HTMLAttributes<HTMLElement> & {};

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
