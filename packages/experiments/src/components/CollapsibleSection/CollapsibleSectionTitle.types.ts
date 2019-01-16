import { IRefObject } from '../../Utilities';
import { IComponentStyles, IHTMLButtonSlot, ISlotProp, IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { ITextSlot } from '../../Text';
import { IIconSlot } from '../../utilities/factoryComponents.types';

export type ICollapsibleSectionTitleComponent = IStatelessComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleTokens,
  ICollapsibleSectionTitleStyles
>;

export type ICollapsibleSectionTitleSlot = ISlotProp<ICollapsibleSectionTitleProps, 'text'>;

export interface ICollapsibleSectionTitleSlots {
  root?: IHTMLButtonSlot;
  chevron?: IIconSlot;
  text?: ITextSlot;
}

export interface ICollapsibleSectionTitleProps
  extends ICollapsibleSectionTitleSlots,
    IStyleableComponentProps<ICollapsibleSectionTitleProps, ICollapsibleSectionTitleTokens, ICollapsibleSectionTitleStyles> {
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

export interface ICollapsibleSectionTitleTokens {}

export type ICollapsibleSectionTitleStyles = IComponentStyles<ICollapsibleSectionTitleSlots>;
