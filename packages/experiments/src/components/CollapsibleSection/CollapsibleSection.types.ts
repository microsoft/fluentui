import * as React from 'react';
import { RefObject } from 'office-ui-fabric-react';

export interface ICollapsibleSectionTitleProps {
  focusElementRef?: RefObject<HTMLElement>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
  indent?: number;
  noChevron?: boolean;
  text?: string;
}

export interface ICollapsibleSectionProps {
  className?: string;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  titleAs: React.ReactType<ICollapsibleSectionTitleProps>;
  titleProps?: ICollapsibleSectionTitleProps;
}
