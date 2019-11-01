import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { getId, classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { calloutExampleStyle, ICalloutExampleStyle } from './Callout.Examples.Styles';

export interface ICalloutCoverExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
  { key: DirectionalHint.topCenter, text: 'Top Center' },
  { key: DirectionalHint.topRightEdge, text: 'Top Right Edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top Auto Edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom Left Edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom Center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom Right Edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom Auto Edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left Top Edge' },
  { key: DirectionalHint.leftCenter, text: 'Left Center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left Bottom Edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right Top Edge' },
  { key: DirectionalHint.rightCenter, text: 'Right Center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' }
];

const getClassNames = classNamesFunction<{}, ICalloutExampleStyle>();
const classNames = getClassNames(calloutExampleStyle, {});

export class CalloutCoverExample extends React.Component<{}, ICalloutCoverExampleState> {
  private _menuButtonElement: HTMLElement | null;
  // Use getId() to ensure that the callout title ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure its uniqueness.)
  private _titleId: string = getId('callout-label');

  public constructor(props: {}) {
    super(props);

    this._onDismiss = this._onDismiss.bind(this);
    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onDirectionalChanged = this._onDirectionalChanged.bind(this);

    this.state = {
      isCalloutVisible: false,
      directionalHint: DirectionalHint.bottomLeftEdge
    };
  }

  public render(): JSX.Element {
    const { isCalloutVisible, directionalHint } = this.state;
    // ms-Callout-smallbeak is used in this directional example to reflect all the positions.
    // Large beak will disable some position to avoid beak over the callout edge.
    return (
      <div className="ms-CalloutExample">
        <div className={css(classNames.msCalloutExampleConfigArea)}>
          <Dropdown
            label="Directional hint"
            selectedKey={directionalHint!}
            options={DIRECTION_OPTIONS}
            onChange={this._onDirectionalChanged}
          />
        </div>
        <div className={css(classNames.msCalloutCoverExampleButtonArea)} ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton text={isCalloutVisible ? 'Hide callout' : 'Show callout'} onClick={this._onShowMenuClicked} />
        </div>
        {isCalloutVisible ? (
          <Callout
            className={css(classNames.msCalloutExampleCallout)}
            ariaLabelledBy={this._titleId}
            onDismiss={this._onDismiss}
            target={this._menuButtonElement}
            directionalHint={directionalHint}
            coverTarget={true}
            isBeakVisible={false}
            gapSpace={0}
          >
            <div className={css(classNames.msCalloutExampleHeader)}>
              <p className={css(classNames.msCalloutExampleTitle)} id={this._titleId}>
                I'm covering the target!
              </p>
            </div>
            <div className={css(classNames.msCalloutExampleInner)}>
              <div className="ms-CalloutExample-content">
                <DefaultButton onClick={this._onShowMenuClicked} text="Click to dismiss" />
              </div>
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _onDismiss(): void {
    this.setState({ isCalloutVisible: false });
  }

  private _onShowMenuClicked(): void {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onDirectionalChanged(event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void {
    this.setState({
      directionalHint: option.key as DirectionalHint
    });
  }
}
