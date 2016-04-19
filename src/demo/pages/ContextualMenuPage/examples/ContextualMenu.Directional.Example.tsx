import * as React from 'react';
import {
  Button,
  Checkbox,
  ContextualMenu,
  DirectionalHint,
  Dropdown,
  TextField,
  IDropdownOption
 } from '../../../../components/index';
import './ContextualMenuExample.scss';

export interface IContextualMenuDirectionalExampleState {
  isContextualMenuVisible?: boolean;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
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

export default class ContextualMenuDirectionalExample extends React.Component<{}, IContextualMenuDirectionalExampleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    menuButton: HTMLElement;
    gapSize: TextField;
  };

  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onShowBeakChanged = this._onShowBeakChanged.bind(this);
    this._onDirectionalChanged = this._onDirectionalChanged.bind(this);
    this._onChangeGapSizeClicked = this._onChangeGapSizeClicked.bind(this);
    this._onDismissMenu = this._onDismissMenu.bind(this);

    this.state = {
      isContextualMenuVisible: false,
      isBeakVisible: false,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 0
    };
  }

  public render() {
    let { isContextualMenuVisible, isBeakVisible, directionalHint, gapSpace } = this.state;

    return (
      <div className='ms-ContextualMenuDirectionalExample'>
       <div className='ms-ContextualMenuDirectionalExample-configArea'>
          <Checkbox text='Show beak' isChecked={ isBeakVisible } onChanged={ this._onShowBeakChanged } />
          <TextField ref='gapSize' label='Gap Space' placeholder='Type in the gap space' />
          <Button onClick={ this._onChangeGapSizeClicked }>Submit</Button>
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
          onDismiss={ this._onDismissMenu }
          items={
            [
              {
                key: 'newItem',
                name: 'New',
                icon: 'circlePlus',
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
                icon: 'upload'
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
                icon: 'share',
                items: [
                  {
                    key: 'sharetoemail',
                    name: 'Share to Email',
                    icon: 'mail'
                  },
                  {
                    key: 'sharetofacebook',
                    name: 'Share to Facebook',
                  },
                  {
                    key: 'sharetotwitter',
                    name: 'Share to Twitter',
                    icon: 'share'
                  },
                ]
              },
              {
                key: 'print',
                name: 'Print',
                icon: 'print'
              },
            ]
          }
        />
        ) : (null) }
      </div>
    );
  }

  private _onShowBeakChanged(isVisible: boolean) {
    this.setState({
      isBeakVisible: isVisible
    });
  }

  private _onShowMenuClicked() {
    this.setState({
      isContextualMenuVisible: !this.state.isContextualMenuVisible
    });
  }

  private _onDismissMenu(ev: any) {
    this.setState({
      isContextualMenuVisible: false
    });
  }

  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: DirectionalHint[option.key]
    });
  }

  private _onChangeGapSizeClicked() {
    this.setState({
      gapSpace: parseInt(this.refs.gapSize.state.value, 10)
    });
  }

}
