import * as React from 'react';
import {
  Button,
  Checkbox,
  ContextualMenu,
  DirectionalHints,
  Dropdown,
  TextField,
  IDropdownOption
 } from '../../../../components/index';
import './ContextualMenuExample.scss';

export interface IContextualMenuDirectionalExampleState {
  isContextualMenuVisible?: boolean;
  directionalHint?: DirectionalHints;
  isBeakVisible?: boolean;
  inputValue?: string;
  gapSpace?: number;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHints[DirectionalHints.topLeftEdge], text: 'Top Left Edge' },
  { key: DirectionalHints[DirectionalHints.topCenter], text: 'Top Center' },
  { key: DirectionalHints[DirectionalHints.topRightEdge], text: 'Top Right Edge' },
  { key: DirectionalHints[DirectionalHints.topAutoEdge], text: 'Top Auto Edge' },
  { key: DirectionalHints[DirectionalHints.bottomLeftEdge], text: 'Bottom Left Edge' },
  { key: DirectionalHints[DirectionalHints.bottomCenter], text: 'Bottom Center' },
  { key: DirectionalHints[DirectionalHints.bottomRightEdge], text: 'Bottom Right Edge' },
  { key: DirectionalHints[DirectionalHints.bottomAutoEdge], text: 'Bottom Auto Edge' },
  { key: DirectionalHints[DirectionalHints.leftTopEdge], text: 'Left Top Edge' },
  { key: DirectionalHints[DirectionalHints.leftCenter], text: 'Left Center' },
  { key: DirectionalHints[DirectionalHints.leftBottomEdge], text: 'Left Bottom Edge' },
  { key: DirectionalHints[DirectionalHints.rightTopEdge], text: 'Right Top Edge' },
  { key: DirectionalHints[DirectionalHints.rightCenter], text: 'Right Center' },
  { key: DirectionalHints[DirectionalHints.rightBottomEdge], text: 'Right Bottom Edge' },
];

export default class ContextualMenuDirectionalExample extends React.Component<any, IContextualMenuDirectionalExampleState> {
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

    this.state = {
      isContextualMenuVisible: false,
      isBeakVisible: false,
      directionalHint: DirectionalHints.bottomLeftEdge,
      inputValue: '0',
      gapSpace: 0
    };
  }

  public render() {
    let { isContextualMenuVisible, isBeakVisible, directionalHint, gapSpace } = this.state;

    return (
      <div className='ms-ContextualMenuDirectionalExample'>
        <Checkbox text='Show beak' isChecked={ isBeakVisible } onChanged={ this._onShowBeakChanged } />
        <TextField ref='gapSize' label='Gap Space' placeholder='Type in the gap space' />
        <Button onClick={ this._onChangeGapSizeClicked }>Submit</Button>
        <Dropdown
          label='Horizontal direction'
          selectedKey={ DirectionalHints[directionalHint] }
          options={ DIRECTION_OPTIONS }
          onChanged={ this._onDirectionalChanged } />
        <div ref='menuButton' style={ { display: 'inline-block' } }>
          <Button onClick={ this._onShowMenuClicked }>Show context menu</Button>
        </div>
        { isContextualMenuVisible ? (
        <ContextualMenu
          targetElement={ this.refs.menuButton }
          isBeakVisible={ isBeakVisible }
          directionalHint={ directionalHint }
          gapSpace={ gapSpace }
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

  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: DirectionalHints[option.key]
    });
  }

  private _onChangeGapSizeClicked() {
    this.setState({
      gapSpace: parseInt(this.refs.gapSize.state.value, 10)
    });
  }

}
