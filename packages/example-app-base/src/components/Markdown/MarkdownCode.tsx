import { IStyleFunctionOrObject, IStyleFunction, classNamesFunction, styled } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { CodeSnippet } from '../CodeSnippet/index';

export interface IMarkdownCodeProps {
  className?: string;

  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IMarkdownCodeStyleProps, IMarkdownCodeStyles>;
}

export interface IMarkdownCodeStyles {
  root: IStyle;
}

export type IMarkdownCodeStyleProps = Required<Pick<IMarkdownCodeProps, 'theme'>>;

const getStyles: IStyleFunction<IMarkdownCodeStyleProps, IMarkdownCodeStyles> = props => {
  const { theme } = props;
  return {
    root: {
      fontFamily: 'monospace',
      fontSize: '14px',
      padding: '0 4px',
      background: theme.palette.neutralLighter,
      border: '1px solid',
      borderColor: theme.palette.neutralLight,
      borderRadius: 3
    }
  };
};

const getClassNames = classNamesFunction<IMarkdownCodeStyleProps, IMarkdownCodeStyles>();

// These class names will be automatically passed in to PageTag instances created by
// markdown-to-jsx based on the language specified in the markdown code block.
const languageClassNames: { [key: string]: string } = {
  'lang-tsx': 'typescript',
  'lang-typescript': 'typescript',
  'lang-jsx': 'javascript',
  'lang-js': 'javascript',
  'lang-javascript': 'javascript',
  'lang-html': 'html',
  'lang-css': 'css',
  'lang-scss': 'scss',
  'lang-md': 'markdown',
  'lang-diff': 'diff'
};

const MarkdownCodeBase: React.StatelessComponent<IMarkdownCodeProps> = props => {
  const { children, theme, className } = props;
  const classNames = getClassNames(getStyles, { theme: theme! });

  const language = languageClassNames[className!];
  if (language) {
    return <CodeSnippet {...props} language={language} className={className} />;
  }

  return <code className={classNames.root}>{children}</code>;
};

export const MarkdownCode: React.StatelessComponent<IMarkdownCodeProps> = styled<
  IMarkdownCodeProps,
  IMarkdownCodeStyleProps,
  IMarkdownCodeStyles
>(MarkdownCodeBase, getStyles);
