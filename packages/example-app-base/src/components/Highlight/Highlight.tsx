import * as React from 'react';
import { registerLanguage, highlightBlock } from 'highlight.js';
import * as javascript from 'highlight.js/lib/languages/javascript';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';

registerLanguage('javascript', javascript);

export interface IHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: () => void;
}

export class Highlight extends BaseComponent<IHighlightProps, {}> {
  private _codeElement: HTMLElement;

  public render(): JSX.Element {
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

  public shouldComponentUpdate(): boolean {
    return false;
  }

  public componentDidMount(): void {
    highlightBlock(this._codeElement);
  }
}
