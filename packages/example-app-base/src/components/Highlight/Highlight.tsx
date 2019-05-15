import * as React from 'react';
import { registerLanguage, highlightBlock } from 'highlight.js';
// @ts-ignore
import * as javascript from 'highlight.js/lib/languages/javascript';
import { createRef } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors } from '@uifabric/fluent-theme';

registerLanguage('javascript', javascript);

export interface IHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: () => void;
}

const rootClass = mergeStyles({
  selectors: {
    '.hljs': {
      display: 'block',
      color: NeutralColors.gray180,
      background: NeutralColors.gray20
    },
    '.hljs-comment, .hljs-quote': {
      color: NeutralColors.gray120,
      fontStyle: 'italic'
    },
    '.hljs-keyword, .hljs-selector-tag, .hljs-subst': {
      color: NeutralColors.gray180,
      fontWeight: 'normal'
    },
    // attribute name
    '.hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr ': {
      color: '#008080'
    },
    // @param
    '.hljs-string, .hljs-doctag': {
      color: '#d14'
    },
    '.hljs-title, .hljs-section, .hljs-selector-id': {
      color: '#900',
      fontWeight: 'bold'
    },
    '.hljs-type, .hljs-class .hljs-title': {
      color: '#458',
      fontWeight: 'bold'
    },
    // rarely used--like a keyword?
    '.hljs-tag, .hljs-name, .hljs-attribute': {
      color: '#000080',
      fontWeight: 'normal'
    },
    '.hljs-regexp, .hljs-link': {
      color: '#009926'
    },
    '.hljs-symbol, .hljs-bullet': {
      color: '#990073'
    },
    '.hljs-built_in, .hljs-builtin-name': {
      color: '#0086b3'
    },
    '.hljs-meta': {
      color: '#999',
      fontWeight: 'bold'
    },
    '.hljs-deletion': {
      background: '#fdd'
    },
    '.hljs-addition': {
      background: '#dfd'
    },
    '.hljs-emphasis': {
      fontStyle: 'italic'
    },
    '.hljs-strong': {
      fontWeight: 'bold'
    }
  }
});

/** @deprecated Use `CodeSnippet` instead */
export class Highlight extends React.Component<IHighlightProps, {}> {
  private _codeElement = createRef<HTMLElement>();

  public render(): JSX.Element {
    return (
      <pre className={rootClass}>
        <code ref={this._codeElement} className="javascript">
          {this.props.children}
        </code>
      </pre>
    );
  }

  public shouldComponentUpdate(): boolean {
    return false;
  }

  public componentDidMount(): void {
    if (this._codeElement.current) {
      highlightBlock(this._codeElement.current);
    }
  }
}
