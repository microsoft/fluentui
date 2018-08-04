import { IStyle, RefObject } from 'office-ui-fabric-react';
import { IStyleableComponent, IThemedProps } from '../../Foundation';

export interface ICollapsibleSectionTitleProps
  extends IStyleableComponent<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles> {
  focusElementRef?: RefObject<HTMLElement>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
  noChevron?: boolean;
  text?: string;
}

export type ICollapsibleSectionTitleStyleProps = IThemedProps<ICollapsibleSectionTitleProps>;

export interface ICollapsibleSectionTitleStyles {
  root: IStyle;
  icon: IStyle;
  text: IStyle;
}
