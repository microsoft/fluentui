import * as React from 'react';
import { mergeStyles } from 'office-ui-fabric-react';
import { FontSizes, NeutralColors } from '@uifabric/fluent-theme';

// tslint:disable no-any
const SyntaxHighlighter = require<any>('react-syntax-highlighter/dist/esm/light').default;

// Import languages from SyntaxHighlighter
const ts = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/typescript').default;
const js = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/javascript').default;
const css = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/css').default;
const scss = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/scss').default;
const md = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/markdown').default;
const bash = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/bash').default;
const diff = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/diff').default;

// Import SyntaxHighlighter styles
const style = require<any>('react-syntax-highlighter/dist/styles/hljs/github').default;
// tslint:enable no-any

// Register languages
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('markdown', md);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('diff', diff);

// Customize imported SyntaxHighlighter styles
style.hljs = {
  fontSize: FontSizes.size14,
  padding: 8,
  background: NeutralColors.gray20,
  color: NeutralColors.gray160,
  overflowX: 'auto'
};

export const rootClass = mergeStyles({
  overflowY: 'auto',
  maxHeight: '400px',
  display: 'flex',
  margin: '12px 0',

  selectors: {
    code: {
      fontFamily: 'Monaco, Menlo, Consolas, "Droid Sans Mono", "Inconsolata", "Courier New", monospace',
      lineHeight: '1.6'
    }
  }
});

export const lineNumberStyle = {
  textAlign: 'right',
  color: NeutralColors.gray120,
  width: '3em',
  display: 'block',
  borderRight: `1px solid ${NeutralColors.gray120}`,
  paddingRight: 4,
  lineHeight: 'inherit'
};

export interface ICodeSnippetProps {
  className?: string;
  language?: string;
}

export class CodeSnippet extends React.Component<ICodeSnippetProps> {
  public render(): JSX.Element {
    return (
      <SyntaxHighlighter lineNumberStyle={lineNumberStyle} language={this.props.language} className={rootClass} style={style}>
        {this.props.children}
      </SyntaxHighlighter>
    );
  }
}
