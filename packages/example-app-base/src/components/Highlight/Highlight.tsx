import * as React from 'react';
import { registerLanguage, highlightBlock } from 'highlight.js';
import * as javascript from 'highlight.js/lib/languages/javascript';
import { createRef, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';

registerLanguage('javascript', javascript);

export interface IHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: () => void;
}

export class Highlight extends BaseComponent<IHighlightProps, {}> {
  private _codeElement = createRef<HTMLElement>();

  public render(): JSX.Element {
    return (
      <pre>
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
