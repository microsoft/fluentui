import { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { ITheme, IStyle } from '../../Styling';
import { DetailsFooterBase } from './DetailsFooter.base';
import { IDetailsRowProps } from './DetailsRow';
export interface IDetailsFooter {
  focus: () => boolean;
}

export interface IDetailsFooterProps extends React.Props<DetailsFooterBase> {
  /**
   * Theme provided by the Higher Order Component
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IDetailsFooterStyleProps, IDetailsFooterStyles>;
  componentRef?: (component: IDetailsFooter | null) => void;
  /**
   * Custom classname
   */
  className?: string;
  footerText?: string;
  footerRowProps?: IDetailsRowProps;
  onRenderRowFooter?: IRenderFunction<IDetailsRowProps>;
}

export type IDetailsFooterStyleProps = Required<Pick<IDetailsFooterProps, 'theme'>> &
  Pick<IDetailsFooterProps, 'className'>; //   & {
//   /** Whether the footer is collapsed */
//   isFooterVisible?: boolean;
// };

export interface IDetailsFooterStyles {
  root: IStyle;
}
