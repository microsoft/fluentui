import * as React from 'react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

// tslint:disable no-any
const SyntaxHighlighter = require<any>('react-syntax-highlighter/dist/esm/light').default;
const ts = require<any>('react-syntax-highlighter/dist/esm/languages/hljs/typescript').default;
const style = require<any>('react-syntax-highlighter/dist/styles/hljs/vs2015').default;
// tslint:enable no-any

SyntaxHighlighter.registerLanguage('typescript', ts);

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

/** @deprecated Use `CodeSnippet` */
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
