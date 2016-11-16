import * as React from 'react';
import './CalloutExample.scss';
import {
  Callout,
  Button,
  DirectionalHint,
  Checkbox,
  Dropdown,
  IDropdownOption,
  Slider,
  autobind
} from '../../../../index';

export interface ICalloutDirectionalExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
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

export class CalloutDirectionalExample extends React.Component<any, ICalloutDirectionalExampleState> {
  private _menuButtonElement: HTMLElement;
  public constructor() {
    super();

    this.state = {
      isCalloutVisible: false,
      isBeakVisible: true,
      directionalHint: DirectionalHint.bottomLeftEdge,
      beakWidth: 10
    };
  }

  public render() {
    let { isCalloutVisible, isBeakVisible, directionalHint, gapSpace, beakWidth } = this.state;
    //  ms-Callout-smallbeak is used in this directional example to reflect all the positions. Large beak will disable some position to avoid beak over the callout edge.
    return (
      <div className='ms-CalloutExample'>
        <div className='ms-CalloutExample-configArea'>
          <Checkbox label='Show beak' checked={ isBeakVisible } onChange={ this._onShowBeakChange } />
          <Slider
            max={ 20 }
            label='Gap Space'
            min={ 0 }
            defaultValue={ 0 }
            onChange={ this._onGapSlider } />
          { isBeakVisible &&
            (<Slider
            max={ 50 }
            label='Beak Width'
            min={ 10 }
            defaultValue={ 10 }
            onChange={ this._onBeakWidthSlider } />) }
          <Dropdown
            label='Directional hint'
            selectedKey={ DirectionalHint[directionalHint]}
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged } />
        </div>
        <div className='ms-CalloutExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onShowMenuClicked } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible ? (
          <Callout
            className='ms-CalloutExample-callout'
            gapSpace={ gapSpace }
            targetElement={ this._menuButtonElement }
            isBeakVisible={ isBeakVisible }
            beakWidth={ beakWidth }
            directionalHint={ directionalHint }
            >
            <div className='ms-CalloutExample-header'>
              <p className='ms-CalloutExample-title'>
                All of your favorite people
              </p>
            </div>
            <div className='ms-CalloutExample-inner'>
              <div className='ms-CalloutExample-content'>
                <p className='ms-CalloutExample-subText'>
                  Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                </p>
              </div>
            </div>
          </Callout>
        ) : (null) }
      </div>
    );
  }

  @autobind
  private _onShowMenuClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  @autobind
  private _onShowBeakChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      isBeakVisible: isVisible,
      beakWidth: 10
    });
  }

  @autobind
  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: DirectionalHint[option.key]
    });
  }

  @autobind
  private _onGapSlider(value: number) {
    this.setState({
      gapSpace: value
    });
  }

  @autobind
  private _onBeakWidthSlider(value: number) {
    this.setState({
      beakWidth: value
    });
  }
}