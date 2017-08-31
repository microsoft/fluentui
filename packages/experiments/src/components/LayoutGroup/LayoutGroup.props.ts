
import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { LayoutGroup } from './LayoutGroup';

export interface ILayoutGroupProps extends IBaseProps, React.HTMLAttributes<LayoutGroup> {
  /**
   * Direction in which the child elements will be layed out.
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Number of pixels between each element. No gap applied to last child.
   * @default 8
   */
  gap?: number;

  /**
   * Method in which children fit into the layout group. Most useful with horizontal direction.
   * @default start
   */
  justify?: 'start' | 'end' | 'center' | 'fill';
}
