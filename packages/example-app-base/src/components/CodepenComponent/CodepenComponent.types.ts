import { IComponentAs, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface ICodepenProps {
  /** JS string to be passed into Codepen */
  jsContent: string | (() => string);

  /** Optional button type */
  buttonAs?: IComponentAs<IButtonProps>;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<ICodepenStyleProps, ICodepenStyles>;
}

export type ICodepenStyleProps = Pick<ICodepenProps, 'theme'>;

export interface ICodepenStyles {
  subComponentStyles: ICodepenSubComponentStyles;
}

export interface ICodepenSubComponentStyles {
  // TODO: remove anys after TS 3 upgrade and full button styling support
  // tslint:disable-next-line:no-any
  button: IStyleFunctionOrObject<any, any>;
}
