import { IStyle, RefObject } from 'office-ui-fabric-react';
import { IStyleableComponentProps, IThemedProps } from '../../Foundation';

export interface ICollapsibleSectionTitleProps
  extends IStyleableComponentProps<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles> {
  focusElementRef?: RefObject<HTMLElement>;
  /**
   * Collapsed state of body associated with this component.
   */
  collapsed?: boolean;
  /**
   * Toggle input callback triggered by mouse and keyboard input.
   */
  onToggleCollapse?: () => void;
  /**
   * Key down callback for input on title.
   */
  onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
  /**
   * Disable chevron appearance.
   */
  chevronDisabled?: boolean;
  /**
   * Title text.
   */
  text?: string;
}

export type ICollapsibleSectionTitleStyleProps = IThemedProps<ICollapsibleSectionTitleProps>;

export interface ICollapsibleSectionTitleStyles {
  root: IStyle;
  icon: IStyle;
  text: IStyle;
}
