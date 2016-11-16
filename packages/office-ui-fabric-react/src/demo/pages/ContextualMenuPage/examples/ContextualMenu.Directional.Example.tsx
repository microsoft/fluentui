import * as React from 'react';
import {
  Button,
  Checkbox,
  ContextualMenu,
  DirectionalHint,
  Dropdown,
  TextField,
  IDropdownOption,
  autobind,
  Slider
 } from '../../../../index';
import './ContextualMenuExample.scss';

export interface IContextualMenuDirectionalExampleState {
  isContextualMenuVisible?: boolean;
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

export class ContextualMenuDirectionalExample extends React.Component<{}, IContextualMenuDirectionalExampleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    menuButton: HTMLElement;
    gapSize: TextField;
  };

  public constructor() {
    super();

    this.state = {
      isContextualMenuVisible: false,
      isBeakVisible: false,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 0,
      beakWidth: 10
    };
  }

  public render() {
    let { isContextualMenuVisible, isBeakVisible, directionalHint, gapSpace, beakWidth } = this.state;

    return (
      <div className='ms-ContextualMenuDirectionalExample'>
       <div className='ms-ContextualMenuDirectionalExample-configArea'>
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
            selectedKey={ DirectionalHint[directionalHint] }
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged } />
        </div>
        <div className='ms-ContextualMenuDirectionalExample-buttonArea' ref='menuButton'>
          <Button onClick={ this._onShowMenuClicked }>{ isContextualMenuVisible ? 'Hide context menu' : 'Show context menu'}</Button>
        </div>
        { isContextualMenuVisible ? (
        <ContextualMenu
          targetElement={ this.refs.menuButton }
          isBeakVisible={ isBeakVisible }
          directionalHint={ directionalHint }
          gapSpace={ gapSpace }
          beakWidth={ beakWidth }
          items={
            [
              {
                key: 'newItem',
                name: 'New',
                icon: 'Add',
                items: [
                  {
                    key: 'emailMessage',
                    name: 'Email message',
                  },
                  {
                    key: 'calendarEvent',
                    name: 'Calendar event',
                  }
                ]
              },
              {
                key: 'upload',
                name: 'Upload',
                icon: 'Upload'
              },
              {
                key: 'rename',
                name: 'Rename',
              },
              {
                key: '-',
                name: '-',
              },
              {
                key: 'share',
                name: 'Share',
                icon: 'Share',
                items: [
                  {
                    key: 'sharetoemail',
                    name: 'Share to Email',
                    icon: 'Mail'
                  },
                  {
                    key: 'sharetofacebook',
                    name: 'Share to Facebook',
                  },
                  {
                    key: 'sharetotwitter',
                    name: 'Share to Twitter',
                    icon: 'Share'
                  },
                ]
              },
              {
                key: 'print',
                name: 'Print',
                icon: 'Print'
              },
            ]
          }
        />
        ) : (null) }
      </div>
    );
  }

  @autobind
  private _onShowBeakChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      isBeakVisible: isVisible
    });
  }

  @autobind
  private _onShowMenuClicked() {
    this.setState({
      isContextualMenuVisible: !this.state.isContextualMenuVisible
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
