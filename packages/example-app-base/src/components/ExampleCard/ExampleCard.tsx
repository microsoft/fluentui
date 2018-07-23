import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import './ExampleCard.scss';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { Highlight } from '../Highlight/Highlight';
import { CodepenComponent } from '../CodepenComponent/CodepenComponent';

export interface IExampleCardProps {
  /* Example Title */
  title: string;
  /* Experimental Component? */
  isOptIn?: boolean;
  /* Example Code as a string */
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
  codepenJS?: string;
}

export interface IExampleCardState {
  isCodeVisible?: boolean;
}

export class ExampleCard extends React.Component<IExampleCardProps, IExampleCardState> {
  constructor(props: IExampleCardProps) {
    super(props);

    this.state = {
      isCodeVisible: false
    };

    this._onToggleCodeClick = this._onToggleCodeClick.bind(this);
  }

  public render(): JSX.Element {
    const { title, code, children, isRightAligned = false, isScrollable = true, codepenJS } = this.props;

    const { isCodeVisible } = this.state;
    let rootClass = 'ExampleCard' + (this.state.isCodeVisible ? ' is-codeVisible' : '');

    return (
      <div className={rootClass}>
        <div className="ExampleCard-header">
          <span className="ExampleCard-title ms-font-l">{title}</span>
          <div className="ExampleCard-toggleButtons ms-font-l">
            {codepenJS && <CodepenComponent jsContent={codepenJS} />}
            {code && (
              <CommandButton
                iconProps={{ iconName: 'Embed' }}
                onClick={this._onToggleCodeClick}
                className={css('ExampleCard-codeButton', isCodeVisible && 'is-active')}
              >
                {isCodeVisible ? 'Hide code' : 'Show code'}
              </CommandButton>
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
