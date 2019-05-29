import * as React from 'react';
import { IClassNames, IStyleFunction, classNamesFunction, styled, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '@uifabric/fluent-theme';

export interface IMarkdownParagraphProps {
  styles?: IStyleFunctionOrObject<IMarkdownParagraphStyleProps, IMarkdownParagraphStyles>;
  theme?: ITheme;
}

export interface IMarkdownParagraphStyles {
  root: IStyle;
}

export interface IMarkdownParagraphStyleProps {
  theme: ITheme;
  isTodo: boolean;
}

const getStyles: IStyleFunction<IMarkdownParagraphStyleProps, IMarkdownParagraphStyles> = props => {
  const { theme, isTodo } = props;
  return {
    root: [
      {
        fontSize: FontSizes.size16,
        lineHeight: '1.4', // quotes prevent conversion to px
        marginBottom: 4
      },
      isTodo && {
        padding: 8,
        background: theme.semanticColors.warningBackground
      }
    ]
  };
};

const getClassNames = classNamesFunction<IMarkdownParagraphStyleProps, IMarkdownParagraphStyles>();

const MarkdownParagraphBase: React.StatelessComponent<IMarkdownParagraphProps> = props => {
  const { children, theme } = props;
  const classNames: IClassNames<IMarkdownParagraphStyles> = getClassNames(props.styles, {
    theme: theme!,
    isTodo: typeof children === 'string' && children.indexOf('TODO') === 0
  });

  return <p className={classNames.root}>{children}</p>;
};

export const MarkdownParagraph: React.StatelessComponent<IMarkdownParagraphProps> = styled<
  IMarkdownParagraphProps,
  IMarkdownParagraphStyleProps,
  IMarkdownParagraphStyles
>(MarkdownParagraphBase, getStyles);
