import { IComponentAs, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IButtonProps } from '@fluentui/react/lib/Button';
import { ITheme } from '@fluentui/react/lib/Styling';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  button: IStyleFunctionOrObject<any, any>;
}
