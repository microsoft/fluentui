import * as React from 'react';
import { IStyleFunctionOrObject, ITheme, IStyle, styled, classNamesFunction, IRawStyle } from 'office-ui-fabric-react';
import { NeutralColors } from '@uifabric/fluent-theme';
import { baseCodeStyle, getStyles } from './CodeSnippet.styles';

// tslint:disable no-any
const SyntaxHighlighter = require<any>('react-syntax-highlighter/dist/esm/light').default;

// Import languages from SyntaxHighlighter
const ts = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/typescript').default;
const scss = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/scss').default;
const md = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/markdown').default;
const bash = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/bash').default;
const xml = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/xml').default;
// tslint:enable no-any

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
  overflowX: 'auto'
};
// Darken comment color for accessibility
style['hljs-comment'] = style['hljs-quote'] = {
  color: NeutralColors.gray120,
  fontStyle: 'italic'
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
  css: 'scss'
};

const CodeSnippetBase: React.StatelessComponent<ICodeSnippetProps> = props => {
  const classNames = getClassNames(props.styles, { className: props.className });
  return (
    <SyntaxHighlighter language={languageMapping[props.language!] || props.language || 'text'} className={classNames.root} style={style}>
      {props.children}
    </SyntaxHighlighter>
  );
};

export const CodeSnippet: React.StatelessComponent<ICodeSnippetProps> = styled<
  ICodeSnippetProps,
  ICodeSnippetStyleProps,
  ICodeSnippetStyles
>(CodeSnippetBase, getStyles, undefined, {
  scope: 'CodeSnippet'
});
