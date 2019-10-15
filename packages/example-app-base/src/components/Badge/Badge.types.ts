import { ReactNode } from 'react';
import { IComponentAs } from 'office-ui-fabric-react';

export interface IBadgeProps {
  /**
   * Optional className
   */
  className?: string;

  /**
   * How to render the badge.
   */
  as?: IComponentAs<IBadgeProps>;

  children: ReactNode;
}
