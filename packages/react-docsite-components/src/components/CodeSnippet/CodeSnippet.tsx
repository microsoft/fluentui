import * as React from 'react';
import {
  IStyleFunctionOrObject,
  ITheme,
  IStyle,
  styled,
  classNamesFunction,
  IRawStyle,
  DefaultPalette,
} from '@fluentui/react';
import { NeutralColors, SharedColors } from '@fluentui/theme';
import { baseCodeStyle, getStyles } from './CodeSnippet.styles';

/* eslint-disable @typescript-eslint/no-explicit-any */
const SyntaxHighlighter = require<any>('react-syntax-highlighter/dist/esm/light').default;

// Import languages from SyntaxHighlighter
const ts = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/typescript').default;
const scss = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/scss').default;
const md = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/markdown').default;
const bash = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/bash').default;
const xml = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/xml').default;
/* eslint-enable @typescript-eslint/no-explicit-any */

// Import SyntaxHighlighter styles
const style: { [key: string]: IRawStyle } = require('react-syntax-highlighter/dist/styles/hljs/github').default;

// Register languages
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('markdown', md);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('html', xml);

// Customize imported SyntaxHighlighter styles. Available properties:
// https://github.com/conorhastings/react-syntax-highlighter/blob/master/src/styles/hljs/github.js
style.hljs = {
  ...baseCodeStyle,
  padding: 8,
  overflowX: 'auto',
};
// Darken comment color for accessibility
style['hljs-comment'] = style['hljs-quote'] = {
  color: NeutralColors.gray130,
  fontStyle: 'italic',
};

style['hljs-built_in'] = style['builtin-name'] = {
  color: DefaultPalette.themeDarker,
};

style['hljs-link'] = style['hljs-regexp'] = {
  color: SharedColors.green20,
};

export interface ICodeSnippetProps {
  className?: string;
  language?: string;
  styles?: IStyleFunctionOrObject<ICodeSnippetStyleProps, ICodeSnippetStyles>;
  theme?: ITheme;
}

export type ICodeSnippetStyleProps = Pick<ICodeSnippetProps, 'className'>;

export interface ICodeSnippetStyles {
  root: IStyle;
}

const getClassNames = classNamesFunction<ICodeSnippetStyleProps, ICodeSnippetStyles>();

const languageMapping: { [key: string]: string } = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'typescript',
  javascript: 'typescript',
  jsx: 'typescript',
  shell: 'bash',
  md: 'markdown',
  css: 'scss',
};

const CodeSnippetBase: React.FunctionComponent<ICodeSnippetProps> = props => {
  const classNames = getClassNames(props.styles, { className: props.className });
  return (
    <SyntaxHighlighter
      language={languageMapping[props.language!] || props.language || 'text'}
      className={classNames.root}
      style={style}
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

export const CodeSnippet: React.FunctionComponent<ICodeSnippetProps> = styled<
  ICodeSnippetProps,
  ICodeSnippetStyleProps,
  ICodeSnippetStyles
>(CodeSnippetBase, getStyles, undefined, {
  scope: 'CodeSnippet',
});
