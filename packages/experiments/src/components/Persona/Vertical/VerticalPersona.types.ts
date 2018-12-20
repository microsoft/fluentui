import { IStyle, IFontWeight } from '@uifabric/styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../../Foundation';
import { ITextSlot, IHTMLDivSlot, IPersonaCoinSlot } from '../../../utilities/factoryComponents.types';

export type IVerticalPersonaComponent = IStatelessComponent<IVerticalPersonaProps, IVerticalPersonaStyles>;

export interface IVerticalPersonaSlots {
  root?: IHTMLDivSlot;
  primaryText?: ITextSlot;
  secondaryText?: ITextSlot;
  coin?: IPersonaCoinSlot;
}

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
// If you don't want these props to be included in your component, just remove this extension.
export interface IVerticalPersonaProps
  extends IVerticalPersonaSlots,
    IStyleableComponentProps<IVerticalPersonaProps, IVerticalPersonaStyles> {
  vertical: true;
  text: string;
  styleVariables?: IVerticalPersonaStyleVariableTypes;
}

export interface IVerticalPersonaStyles {
  root: IStyle;
  primaryText: IStyle;
  secondaryText: IStyle;
  coin: IStyle; // TODO: Check if this works after Jason his PR
}

export interface IVerticalPersonaStyleVariableTypes {
  verticalPersonaWidth: number;
  text: ITextStyleVariables;
  primaryText: IPrimaryTextStyleVariables;
  secondaryText: ISecondaryTextStyleVariables;
}

export interface ITextStyleVariables {
  height: number;
  fontFamily: string;
  textPaddingLeftAndRight: number;
}

export interface IPrimaryTextStyleVariables {
  paddingTop: string;
  fontSize: string;
  fontWeight: IFontWeight;
}

export interface ISecondaryTextStyleVariables {
  paddingTop: string;
  fontSize: string;
}
