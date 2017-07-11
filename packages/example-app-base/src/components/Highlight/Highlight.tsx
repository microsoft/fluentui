import * as React from 'react';
import { registerLanguage } from 'highlight.js';
import * as javascript from 'highlight.js/lib/languages/javascript';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';

registerLanguage('javascript', javascript);

export class Highlight extends BaseComponent<React.HTMLAttributes<HTMLDivElement>, {}> {
  private _codeElement: HTMLElement;

  public render() {
    return (
      <pre>
        <code
          ref={ this._resolveRef('_codeElement') }
          className='javascript'
        >
          { this.props.children }
        </code>
      </pre>
    );
  }

  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount() {
    hljs.highlightBlock(this._codeElement);
  }
}
