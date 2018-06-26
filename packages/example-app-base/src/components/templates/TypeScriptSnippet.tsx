import * as React from 'react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

// tslint:disable-next-line:no-any
declare const require: (location: string) => any;

const { default: SyntaxHighlighter, registerLanguage } = require('react-syntax-highlighter/light');
const { default: ts } = require('react-syntax-highlighter/languages/hljs/typescript');
const { default: style } = require('react-syntax-highlighter/styles/hljs/vs2015');

registerLanguage('typescript', ts);

export const rootClass = mergeStyles({
  overflowY: 'auto',
  maxHeight: '400px',
  display: 'flex',
  selectors: {
    code: {
      fontFamily: 'Monaco, Menlo, Consolas, "Droid Sans Mono", "Inconsolata", "Courier New", monospace',
      lineHeight: '1.6'
    }
  }
});

export const lineNumberStyle = {
  textAlign: 'right',
  color: '#666',
  width: 40,
  display: 'block',
  borderRight: '1px solid #666',
  paddingRight: 4,
  lineHeight: 'inherit'
};

export class TypeScriptSnippet extends React.Component {
  public render(): JSX.Element {
    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        lineNumberStyle={lineNumberStyle}
        language="typescript"
        className={rootClass}
        style={style} // tslint:disable-line
      >
        {this.props.children}
      </SyntaxHighlighter>
    );
  }
}
