import { IStyle, IFontWeight } from 'office-ui-fabric-react/lib/Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { IPersonaCoinProps } from '../PersonaCoin/PersonaCoin.types';

export type IVerticalPersonaComponent = IStatelessComponent<IVerticalPersonaProps, IVerticalPersonaStyles>;

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IVerticalPersonaProps extends IStyleableComponentProps<IVerticalPersonaProps, IVerticalPersonaStyles> {
  text: string;
  secondaryText?: string;

  /**
   * Properties that should be passed to the PersonaCoin component
   */
  coinProps?: Partial<IPersonaCoinProps>;
  styleVariables?: IVerticalPersonaStyleVariableTypes;
}

export interface IVerticalPersonaStyles {
  root: IStyle;
  text: IStyle;
  secondaryText: IStyle;
}

export interface IVerticalPersonaStyleVariableTypes {
  text: ITextStyleVariables;
  primaryText: IPrimaryTextStyleVariables;
  secondaryText: ISecondaryTextStyleVariables;
}

interface ITextStyleVariables {
  height: string;
  fontFamily: string;
  width: string;
}

interface IPrimaryTextStyleVariables {
  paddingTop: string;
  fontSize: string;
  fontWeight: IFontWeight;
}

interface ISecondaryTextStyleVariables {
  paddingTop: string;
  fontSize: string;
}
