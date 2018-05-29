import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react';

import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

export interface ICollapsibleSectionProps {
  // TODO: how to incorporate className into createComponent?
  className?: string;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  titleAs: React.ReactType<ICollapsibleSectionTitleProps>;
  titleProps?: ICollapsibleSectionTitleProps;
}

export interface ICollapsibleSectionStyles {
  child: IStyle;
}
