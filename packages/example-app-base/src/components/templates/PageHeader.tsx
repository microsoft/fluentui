import * as React from 'react';
import {
  BaseComponent,
  IBaseProps,
  customizable,
  classNamesFunction,
  IStyleFunctionOrObject,
  styled
} from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * The getStyles props contract.
 */
export interface IPageHeaderStyleProps {
  theme: ITheme;
  as: string;
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
  as?: string;
  children?: JSX.Element | string;
  styles?: IStyleFunctionOrObject<IPageHeaderStyleProps, IPageHeaderStyles>;
  // getStyles?: IGetStylesFunction<IPageHeaderStyleProps, IPageHeaderStyles>;
}

const getClassNames = classNamesFunction<IPageHeaderStyleProps, IPageHeaderStyles>();

@customizable('PageHeader', ['theme', 'styles'])
export class PageHeaderBase extends BaseComponent<IPageHeaderProps, {}> {
  public render(): JSX.Element {
    const { as: RootType = 'h1', theme, children, styles } = this.props;

    const classNames = getClassNames(styles, { theme: theme!, as: RootType });

    return <RootType className={classNames.root}>{children}</RootType>;
  }
}

/**
 * A variant of PageHeaderBase with styling.
 */
export const PageHeader = styled(
  // export const PageHeader = createStyled(
  PageHeaderBase as React.ComponentClass<IPageHeaderProps>,
  (props: IPageHeaderStyleProps): Partial<IPageHeaderStyles> => ({
    root: [
      props.theme.fonts.large,
      {
        margin: 0,
        padding: '8px 0 4px'
      },
      props.as === 'h1' && [
        props.theme.fonts.xxLarge,
        {
          margin: 0,
          padding: '16px 0 4px'
        }
      ],
      props.as === 'h2' && [
        props.theme.fonts.xLarge,
        {
          margin: 0,
          padding: '12px 0 4px'
        }
      ]
    ]
  })
);
