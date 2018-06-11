import { BaseComponent, IBaseProps, IClassNames, customizable } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';

export interface IPageTitleProps extends React.Props<PageTitle>, IBaseProps {
  theme?: ITheme;
}

export interface IPageTitleStyles {
  root: IStyle;
  title: IStyle;
}

export interface IPageTitleStyleProps {
  theme: ITheme;
}

const getDefaultStyles = (props: IPageTitleStyleProps): IPageTitleStyles => ({
  root: {
    height: 236,
    padding: '0 40px',
    background: props.theme.palette.blue,
    color: props.theme.palette.white,
    selectors: {
      '@media(max-width: 800px)': {
        height: 130
      }
    }
  },
  title: [
    props.theme.fonts.mega,
    {
      fontSize: '5.5vw',
      whiteSpace: 'nowrap',
      lineHeight: 236,
      margin: 0,
      selectors: {
        '@media(max-width: 800px)': [
          {
            fontSize: '6.5vw',
            lineHeight: 130
          }
        ]
      }
    }
  ]
});

@customizable('PageTitle', ['theme', 'styles'])
export class PageTitle extends BaseComponent<IPageTitleProps, {}> {
  public render(): JSX.Element {
    const { children, theme } = this.props;
    const styleProps: IPageTitleStyleProps = { theme: theme! };
    const classNames: IClassNames<IPageTitleStyles> = mergeStyleSets(getDefaultStyles(styleProps));

    return (
      <div className={classNames.root}>
        <h1 className={classNames.title}>{children}</h1>
      </div>
    );
  }
}
