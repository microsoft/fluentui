import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import './ExampleCard.scss';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { Highlight } from '../Highlight/Highlight';

export interface IExampleCardProps {
  /* Example Title */
  title: string;
  /* Experimental Component? */
  isOptIn?: boolean;
  /* Example Code */
  code?: string;
  /* Children of the Example */
  children?: React.ReactNode;
  /* Example is Right-Aligned ? */
  isRightAligned?: boolean;
  /* Example dos */
  dos?: JSX.Element;
  /* Example don'ts */
  donts?: JSX.Element;
  /* Example is scrollable ? */
  isScrollable?: boolean;
  /* JS string for Codepen portion of Example */
  codepen?: string;
}

export interface IExampleCardState {
  isCodeVisible?: boolean;
}

// boilerplate for codepen API
const htmlContent = `<script src="//unpkg.com/office-ui-fabric-react/dist/office-ui-fabric-react.min.js"></script>
<div id=\'content\'></div>`;

const headContent = `<script type="text/javascript" src="https://unpkg.com/react@16/umd/react.development.js"></script><script type="text/javascript" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>`;

export class ExampleCard extends React.Component<IExampleCardProps, IExampleCardState> {
  constructor(props: IExampleCardProps) {
    super(props);

    this.state = {
      isCodeVisible: false
    };

    this._onToggleCodeClick = this._onToggleCodeClick.bind(this);
  }

  public render(): JSX.Element {
    const { title, code, children, isRightAligned = false, isScrollable = true, codepen } = this.props;

    // more codepen API boilerplate
    const jsContent = codepen;
    const valueData = {
      title: 'Fabric Example Pen',
      html: htmlContent,
      head: headContent,
      js: jsContent,
      js_pre_processor: 'typescript'
    };
    // reformat the JSON string to take out the quotes so it'll work with the Codepen API
    const JSONstring = JSON.stringify(valueData)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    const { isCodeVisible } = this.state;
    let rootClass = 'ExampleCard' + (this.state.isCodeVisible ? ' is-codeVisible' : '');

    return (
      <div className={rootClass}>
        <div className="ExampleCard-header">
          <span className="ExampleCard-title ms-font-l">{title}</span>
          <div className="ExampleCard-toggleButtons ms-font-l">
            {codepen ? (
              <form action="https://codepen.io/pen/define" method="POST" target="_blank">
                <input type="hidden" name="data" value={JSONstring} />
                <CommandButton
                  type="submit"
                  iconProps={{ iconName: 'OpenInNewWindow' }}
                  text="Export to Codepen"
                  className={css('ExampleCard-codeButton')}
                />
              </form>
            ) : (
              undefined
            )}
            {code ? (
              <CommandButton
                iconProps={{ iconName: 'Embed' }}
                onClick={this._onToggleCodeClick}
                className={css('ExampleCard-codeButton', isCodeVisible && 'is-active')}
              >
                {isCodeVisible ? 'Hide code' : 'Show code'}
              </CommandButton>
            ) : (
              undefined
            )}
          </div>
        </div>

        <div className="ExampleCard-code">{isCodeVisible && <Highlight>{code}</Highlight>}</div>

        <div
          className={css('ExampleCard-example', {
            'is-right-aligned': isRightAligned,
            'is-scrollable': isScrollable
          })}
          data-is-scrollable={isScrollable}
        >
          {children}
        </div>

        {this._getDosAndDonts()}
      </div>
    );
  }

  private _getDosAndDonts(): JSX.Element | void {
    if (this.props.dos && this.props.donts) {
      return (
        <div className="ExampleCard-dosAndDonts">
          <div className="ExampleCard-dos">
            <h4>Do</h4>
            {this.props.dos}
          </div>
          <div className="ExampleCard-donts">
            <h4>Do not</h4>
            {this.props.donts}
          </div>
        </div>
      );
    }
  }

  private _onToggleCodeClick(): void {
    this.setState({
      isCodeVisible: !this.state.isCodeVisible
    });
  }
}
