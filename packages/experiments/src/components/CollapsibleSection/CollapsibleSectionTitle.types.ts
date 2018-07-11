import { IStyle, RefObject } from 'office-ui-fabric-react';

export interface ICollapsibleSectionTitleProps {
  focusElementRef?: RefObject<HTMLElement>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
  noChevron?: boolean;
  text?: string;
}

export interface ICollapsibleSectionTitleStyles {
  root: IStyle;
  icon: IStyle;
  text: IStyle;
}
