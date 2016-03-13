import * as React from 'react';
import {
  Button,
  Checkbox,
  ContextualMenu,
  DirectionalHint,
  Dropdown,
  IDropdownOption
 } from '../../../../components/index';
import './ContextualMenuExample.scss';

export interface IContextualMenuDirectionalExampleState {
  isContextualMenuVisible?: boolean;
  horizontalAlignmentHint?: DirectionalHint;
  verticalAlignmentHint?: DirectionalHint;
  isBeakVisible?: boolean;
}

const HORIZONTAL_DIRECTION_OPTIONS = [
  { key: DirectionalHint[DirectionalHint.left], text: 'Left' },
  { key: DirectionalHint[DirectionalHint.center], text: 'Center' },
  { key: DirectionalHint[DirectionalHint.right], text: 'Right' }
];

const VERTICAL_DIRECTION_OPTIONS = [
  { key: DirectionalHint[DirectionalHint.top], text: 'Top' },
  { key: DirectionalHint[DirectionalHint.center], text: 'Center' },
  { key: DirectionalHint[DirectionalHint.bottom], text: 'Bottom' }
];

export default class ContextualMenuDirectionalExample extends React.Component<any, IContextualMenuDirectionalExampleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    menuButton: HTMLElement;
  };

  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onShowBeakChanged = this._onShowBeakChanged.bind(this);
    this._onHorizontalChanged = this._onHorizontalChanged.bind(this);
    this._onVerticalChanged = this._onVerticalChanged.bind(this);

    this.state = {
      isContextualMenuVisible: false,
      isBeakVisible: false,
      horizontalAlignmentHint: DirectionalHint.center,
      verticalAlignmentHint: DirectionalHint.bottom
    };
  }

  public render() {
    let { isContextualMenuVisible, isBeakVisible, horizontalAlignmentHint, verticalAlignmentHint } = this.state;

    return (
      <div className='ms-ContextualMenuDirectionalExample'>
        <Checkbox text='Show beak' isChecked={ isBeakVisible } onChanged={ this._onShowBeakChanged } />
        <Dropdown
          label='Horizontal direction'
          selectedKey={ DirectionalHint[horizontalAlignmentHint] }
          options={ HORIZONTAL_DIRECTION_OPTIONS }
          onChanged={ this._onHorizontalChanged } />
        <Dropdown
          label='Vertical direction'
          selectedKey={ DirectionalHint[verticalAlignmentHint] }
          options={ VERTICAL_DIRECTION_OPTIONS }
          onChanged={ this._onVerticalChanged } />

        <Dropdown
          label='Vertical direction'
          selectedKey={ DirectionalHint[verticalAlignmentHint] }
          options={ VERTICAL_DIRECTION_OPTIONS }
          onChanged={ this._onVerticalChanged } />

        <div ref='menuButton' style={ { display: 'inline-block' } }>
          <Button onClick={ this._onShowMenuClicked }>Show context menu</Button>
        </div>
        { isContextualMenuVisible ? (
        <ContextualMenu
          targetElement={ this.refs.menuButton }
          isBeakVisible={ isBeakVisible }
          horizontalAlignmentHint={ horizontalAlignmentHint }
          verticalAlignmentHint={ verticalAlignmentHint }
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

  private _onHorizontalChanged(option: IDropdownOption) {
    this.setState({
      horizontalAlignmentHint: DirectionalHint[option.key]
    });
  }
  private _onVerticalChanged(option: IDropdownOption) {
    this.setState({
      verticalAlignmentHint: DirectionalHint[option.key]
    });
  }
}
