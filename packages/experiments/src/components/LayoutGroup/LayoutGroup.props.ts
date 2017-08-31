
import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { LayoutGroup } from './LayoutGroup';

export interface ILayoutGroupProps extends IBaseProps, React.HTMLAttributes<LayoutGroup> {

  direction?: 'vertical' | 'horizontal';

  gap?: number;
}
