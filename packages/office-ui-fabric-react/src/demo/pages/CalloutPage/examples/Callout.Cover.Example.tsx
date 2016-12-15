import * as React from 'react';
import './CalloutExample.scss';
import {
  Callout,
  Button,
  DirectionalHint,
  Dropdown,
  IDropdownOption
} from '../../../../index';

export interface ICalloutCoverExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHint[DirectionalHint.topLeftEdge], text: 'Top Left Edge' },
  { key: DirectionalHint[DirectionalHint.topCenter], text: 'Top Center' },
  { key: DirectionalHint[DirectionalHint.topRightEdge], text: 'Top Right Edge' },
  { key: DirectionalHint[DirectionalHint.topAutoEdge], text: 'Top Auto Edge' },
  { key: DirectionalHint[DirectionalHint.bottomLeftEdge], text: 'Bottom Left Edge' },
  { key: DirectionalHint[DirectionalHint.bottomCenter], text: 'Bottom Center' },
  { key: DirectionalHint[DirectionalHint.bottomRightEdge], text: 'Bottom Right Edge' },
  { key: DirectionalHint[DirectionalHint.bottomAutoEdge], text: 'Bottom Auto Edge' },
  { key: DirectionalHint[DirectionalHint.leftTopEdge], text: 'Left Top Edge' },
  { key: DirectionalHint[DirectionalHint.leftCenter], text: 'Left Center' },
  { key: DirectionalHint[DirectionalHint.leftBottomEdge], text: 'Left Bottom Edge' },
  { key: DirectionalHint[DirectionalHint.rightTopEdge], text: 'Right Top Edge' },
  { key: DirectionalHint[DirectionalHint.rightCenter], text: 'Right Center' },
  { key: DirectionalHint[DirectionalHint.rightBottomEdge], text: 'Right Bottom Edge' },
];

export class CalloutCoverExample extends React.Component<any, ICalloutCoverExampleState> {
  private _menuButtonElement: HTMLElement;

  public constructor() {
    super();

    this._onDismiss = this._onDismiss.bind(this);
    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onDirectionalChanged = this._onDirectionalChanged.bind(this);

    this.state = {
      isCalloutVisible: false,
      directionalHint: DirectionalHint.bottomLeftEdge
    };
  }

  public render() {
    let { isCalloutVisible, directionalHint } = this.state;
    // ms-Callout-smallbeak is used in this directional example to reflect all the positions. Large beak will disable some position to avoid beak over the callout edge.
    return (
      <div className='ms-CalloutExample'>
         <div className='ms-CalloutExample-configArea'>
          <Dropdown
            label='Directional hint'
            selectedKey={ DirectionalHint[directionalHint] }
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged } />
        </div>
        <div className='ms-CalloutCoverExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onShowMenuClicked } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible ? (
        <Callout
          className='ms-CalloutExample-callout'
          onDismiss={ this._onDismiss }
          targetElement={ this._menuButtonElement }
          directionalHint={ directionalHint }
          coverTarget={ true }
          isBeakVisible={ false }
          gapSpace={ 0 }
         >
            <div className='ms-CalloutExample-header'>
              <p className='ms-CalloutExample-title'>
                I'm covering the target!
              </p>
            </div>
            <div className='ms-CalloutExample-inner'>
              <div className='ms-CalloutExample-content'>
              <Button onClick={ this._onShowMenuClicked }> Click to dismiss </Button>
              </div>
            </div>
         </Callout>
        ) : (null) }
      </div>
    );
  }

  private _onDismiss() {
    this.setState({ isCalloutVisible: false });
  }

  private _onShowMenuClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: DirectionalHint[option.key]
    });
  }
}