import { IWithResponsiveModeState } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IHeaderProps extends IWithResponsiveModeState {
  title: string;
  sideLinks: { name: string; url: string }[];

  isMenuVisible: boolean;
  onIsMenuVisibleChanged?: (isMenuVisible: boolean) => void;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IHeaderStyleProps, IHeaderStyles>;
}

export type IHeaderStyleProps = {};

export interface IHeaderStyles {
  root: IStyle;
  title: IStyle;
  button: IStyle;
  buttons: IStyle;
}
