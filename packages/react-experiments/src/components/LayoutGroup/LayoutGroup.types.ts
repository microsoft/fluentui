import * as React from 'react';
import { IBaseProps } from '@fluentui/react/lib/Utilities';
import { LayoutGroup } from './LayoutGroup';

export interface ILayoutGroupProps extends IBaseProps, React.HTMLAttributes<LayoutGroup | HTMLDivElement> {
  /**
   * Direction in which the child elements will be layed out.
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Number of pixels between each element. No layoutGap applied to last child.
   * @default 8
   */
  layoutGap?: number;

  /**
   * Method in which children fit into the layout group. Most useful with horizontal direction.
   * @default start
   */
  justify?: 'start' | 'end' | 'center' | 'fill';
}
