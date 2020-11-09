//
// Experimental syntax highlighter using prism instead of highlight.js
//

import * as React from 'react';
import { styled, classNamesFunction, IRawStyle } from '@fluentui/react';
import { ICodeSnippetStyleProps, ICodeSnippetStyles, ICodeSnippetProps } from './CodeSnippet';
import { getStyles, baseCodeStyle } from './CodeSnippet.styles';

/* eslint-disable @typescript-eslint/no-explicit-any */
const SyntaxHighlighter = require<any>('react-syntax-highlighter/dist/esm/prism-light').default;

// Import languages from SyntaxHighlighter
const ts = require<any>('react-syntax-highlighter/dist/esm/languages/prism/tsx').default;
const scss = require<any>('react-syntax-highlighter/dist/esm/languages/prism/scss').default;
const md = require<any>('react-syntax-highlighter/dist/esm/languages/prism/markdown').default;
const bash = require<any>('react-syntax-highlighter/dist/esm/languages/prism/bash').default;
const markup = require<any>('react-syntax-highlighter/dist/esm/languages/prism/markup').default;
/* eslint-enable @typescript-eslint/no-explicit-any */

// Import SyntaxHighlighter styles
const style: { [key: string]: IRawStyle } = require('react-syntax-highlighter/dist/styles/prism/prism').default;

// Register languages
SyntaxHighlighter.registerLanguage('tsx', ts);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('markdown', md);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('html', markup);

const codeStyle: IRawStyle = {
  ...baseCodeStyle,
  lineHeight: '1.6',
  border: 'none',
  overflow: undefined,
  margin: 0,
};

// Customize imported styles based on
// https://github.com/conorhastings/react-syntax-highlighter/blob/master/src/styles/prism/ghcolors.js
for (const key of Object.keys(style)) {
  // No extra background colors
  delete style[key].background;
  delete style[key].backgroundColor;

  if (key.indexOf('::') !== -1) {
    // delete special selection styles
    delete style[key];
  } else if (key.indexOf('code[') === 0) {
    style[key] = {
      ...style[key],
      ...codeStyle,
      padding: '4px 0',
    };
  } else if (key.indexOf('pre[') === 0) {
    style[key] = {
      ...style[key],
      ...codeStyle,
      padding: 8,
      overflowX: 'auto',
    };
  } else if (key.indexOf(':not(pre) > code') === 0) {
    // inline code styles
    delete style[key];
  }
}

// Still working on figuring out an appropriate color palette.
// const literalAndKeywordStyle: IRawStyle = {
//   color: '#0086b3'
// };
// // color: '#0086b3'
// style.atrule = style.keyword = style['attr-name'] = literalAndKeywordStyle;
// style.function = {
//   color: '#900'
// };
// style.string = style['attr-value'] = {
//   color: '#d14'
// };
// style.entity = style.url = style.number = style.boolean = style.variable = style.constant = literalAndKeywordStyle;
// style.property = style.regex = style.inserted = literalAndKeywordStyle;

// style.comment = {
//   color: '#6a737d',
//   fontStyle: 'italic'
// };
// style.namespace = {
//   opacity: 1
// };
// style.string = style['attr-value'] = {
//   color: '#d14'
// };
// style.punctuation = style.operator = {};
// style.atrule = style['attr-name'] = {
//   color: NeutralColors.gray160,
//   fontWeight: 'normal'
// };
// style.keyword = {
//   color: NeutralColors.gray160
// };
// // from .hljs-title
// style.function = {
//   color: '#900'
// };
// style.deleted = {
//   color: '#900'
// };
// style.tag = style.selector = {
//   color: '#000080',
//   fontWeight: 'normal'
// };
// style.important = {
//   fontWeight: 'normal'
// };

const getClassNames = classNamesFunction<ICodeSnippetStyleProps, ICodeSnippetStyles>();

const languageMapping: { [key: string]: string } = {
  ts: 'tsx',
  typescript: 'tsx',
  js: 'tsx',
  javascript: 'tsx',
  jsx: 'tsx',
  shell: 'bash',
  md: 'markdown',
  css: 'scss',
};

const PrismCodeSnippetBase: React.FunctionComponent<ICodeSnippetProps> = props => {
  const classNames = getClassNames(props.styles, {});
  return (
    <SyntaxHighlighter
      // useInlineStyles={false}
      language={languageMapping[props.language!] || props.language || 'text'}
      className={classNames.root}
      style={style}
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

export const PrismCodeSnippet: React.FunctionComponent<ICodeSnippetProps> = styled<
  ICodeSnippetProps,
  ICodeSnippetStyleProps,
  ICodeSnippetStyles
>(PrismCodeSnippetBase, getStyles, undefined, {
  scope: 'CodeSnippet',
});
