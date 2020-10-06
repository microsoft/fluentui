import { ReactNode } from 'react';
import { IComponentAs } from '@fluentui/react';

export interface IDisplayToggle {
  /**
   * Optional className
   */
  className?: string;

  offClass?: string;

  onClass?: string;

  onText?: string;
  offText?: string;
  label?: string;

  /**
   * How to render the badge.
   */
  as?: IComponentAs<IDisplayToggle>;

  children: ReactNode;
}
