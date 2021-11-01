import * as React from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { css } from '@fluentui/react/lib/Utilities';
import { CODE_FONT_FAMILY } from './consts';
import type { IRawStyle } from '@fluentui/react/lib/Styling';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

// react-syntax-highlighter has typings, but they're wrong aside from the props and missing many paths...
/* eslint-disable @typescript-eslint/no-explicit-any */
const SyntaxHighlighter = require<{
  default: React.ComponentType<SyntaxHighlighterProps> & { registerLanguage: (lang: string, func: any) => void };
}>('react-syntax-highlighter/dist/esm/prism-light').default;
const ts = require<any>('react-syntax-highlighter/dist/esm/languages/prism/tsx').default;
const style: { [key: string]: IRawStyle } = require('react-syntax-highlighter/dist/styles/prism/vs').default;
/* eslint-enable @typescript-eslint/no-explicit-any */

// Register languages
SyntaxHighlighter.registerLanguage('tsx', ts);

// Customize the styles, including to match the colors from Monaco
// (because that looks better but also because Monaco's colors are more accesssible)
// https://github.com/conorhastings/react-syntax-highlighter/blob/master/src/styles/prism/vs.js
const colorMap: { [key: string]: string } = {
  '#2b91af': '#008080', // class name
  '#36acaa': '#09885a', // number
  '#ff0000': '#ee0000', // attrs, various (not from monaco)
  '#393a34': '#000000', // operators, function names
};
const codeStyle: IRawStyle = {
  fontFamily: CODE_FONT_FAMILY,
  fontSize: '12px', // matches Monaco
  color: 'black',
  lineHeight: '1.6',
  border: 'none',
  margin: 0,
};
for (const key of Object.keys(style)) {
  // No extra background colors or italics
  delete style[key].background;
  delete style[key].backgroundColor;
  delete style[key].fontStyle;

  if (key.indexOf('::') !== -1 || key.indexOf(':not(pre) > code') === 0 || key === 'code[class*="language-css"]') {
    // delete special selection styles, inline code styles, and special CSS styles
    delete style[key];
  } else if (key.indexOf('code[') === 0) {
    style[key] = {
      ...style[key],
      ...codeStyle,
    };
  } else if (key.indexOf('pre[') === 0) {
    style[key] = {
      ...style[key],
      ...codeStyle,
      padding: '6px 20px',
      background: 'white',
    };
  } else {
    // correct text colors (convert to lowercase due to inconsistent casing)
    const color = (style[key].color || '').toLowerCase();
    if (colorMap[color]) {
      style[key].color = colorMap[color];
    }
  }
}

const rootClass = mergeStyles({
  maxHeight: 400,
});

export interface ITypeScriptSnippetProps {
  className?: string;
}

/** TypeScript code snippet with a theme similar to Monaco's VS light. */
export const TypeScriptSnippet: React.FunctionComponent<ITypeScriptSnippetProps> = props => {
  return (
    <SyntaxHighlighter className={css(rootClass, props.className)} language="tsx" style={style}>
      {props.children}
    </SyntaxHighlighter>
  );
};
