import { IRefObject } from '../../Utilities';
import { IComponentStyles, ISlotProp, IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { ITextSlot } from '../../Text';
import { IHTMLButtonSlot, IIconSlot } from '../../utilities/factoryComponents.types';

export type ICollapsibleSectionTitleComponent = IStatelessComponent<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles>;

export type ICollapsibleSectionTitleSlot = ISlotProp<ICollapsibleSectionTitleProps, 'text'>;

export interface ICollapsibleSectionTitleSlots {
  root?: IHTMLButtonSlot;
  // TODO: consider renaming icon to chevron before promotion to align with other props
  icon?: IIconSlot;
  text?: ITextSlot;
}

export interface ICollapsibleSectionTitleProps
  extends ICollapsibleSectionTitleSlots,
    IStyleableComponentProps<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles> {
  focusElementRef?: IRefObject<HTMLButtonElement>;
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
   * Indentation of title.
   */
  indent?: number;
}

export type ICollapsibleSectionTitleStyles = IComponentStyles<ICollapsibleSectionTitleSlots>;
