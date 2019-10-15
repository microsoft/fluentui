import { IBaseProps, IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * The getStyles props contract.
 */
export interface IPageHeaderStylesProps {
  theme: ITheme;
}

/**
 * The styles produced by getStyles.
 */
export interface IPageHeaderStyles {
  root: IStyle;
}

/**
 * The component props.
 */
export interface IPageHeaderProps extends IBaseProps {
  theme?: ITheme;
  children?: JSX.Element | string;
  getStyles?: IStyleFunction<IPageHeaderStylesProps, IPageHeaderStyles>;
  // getStyles?: IGetStylesFunction<IPageHeaderStylesProps, IPageHeaderStyles>;
}
