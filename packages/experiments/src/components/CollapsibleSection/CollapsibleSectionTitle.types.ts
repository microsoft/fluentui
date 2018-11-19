import { IStyle, RefObject } from 'office-ui-fabric-react';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type ICollapsibleSectionTitleComponent = IStatelessComponent<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles>;

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
  onClick?: (ev: React.MouseEvent<Element>) => void;
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

  /**
   * Indentation of title.
   */
  indent?: number;
}

export interface ICollapsibleSectionTitleStyles {
  root: IStyle;
  icon: IStyle;
  text: IStyle;
}
