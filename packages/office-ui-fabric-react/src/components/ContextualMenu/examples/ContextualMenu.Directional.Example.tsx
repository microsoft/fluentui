import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ContextualMenu, DirectionalHint, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import './ContextualMenuExample.scss';

export interface IContextualMenuDirectionalExampleState {
  isContextualMenuVisible?: boolean;
  directionalHint?: DirectionalHint;
  directionalHintForRTL?: DirectionalHint;
  useDirectionalHintForRtl?: boolean;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
  edgeFixed?: boolean;
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
      directionalHintForRTL: DirectionalHint.bottomLeftEdge,
      useDirectionalHintForRtl: false,
      gapSpace: 0,
      beakWidth: 10,
      edgeFixed: false
    };
  }

  public render() {
    let {
      beakWidth,
      directionalHint,
      directionalHintForRTL,
      edgeFixed,
      gapSpace,
      isBeakVisible,
      isContextualMenuVisible,
      useDirectionalHintForRtl
    } = this.state;

    return (
      <div className='ms-ContextualMenuDirectionalExample'>
        <div className='ms-ContextualMenuDirectionalExample-configArea'>
          <Checkbox label='Show beak' checked={ isBeakVisible } onChange={ this._onShowBeakChange } />
          <Checkbox label='Fix Edge' checked={ edgeFixed } onChange={ this._onFixEdgeChange } />
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
            selectedKey={ DirectionalHint[directionalHint!] }
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged } />
          { getRTL() &&
            <Checkbox label='Use RTL directional hint' checked={ useDirectionalHintForRtl } onChange={ this._onUseRtlHintChange } />
          }
          { getRTL() &&
            <Dropdown
              label='Directional hint for RTL'
              selectedKey={ DirectionalHint[directionalHintForRTL!] }
              options={ DIRECTION_OPTIONS }
              onChanged={ this._onDirectionalRtlChanged }
              disabled={ !useDirectionalHintForRtl } />
          }
        </div>
        <div className='ms-ContextualMenuDirectionalExample-buttonArea' ref='menuButton'>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isContextualMenuVisible ? 'Hide context menu' : 'Show context menu' }
          />
        </div>
        { isContextualMenuVisible ? (
          <ContextualMenu
            target={ this.refs.menuButton }
            isBeakVisible={ isBeakVisible }
            directionalHint={ directionalHint }
            directionalHintForRTL={ useDirectionalHintForRtl ? directionalHintForRTL : undefined }
            gapSpace={ gapSpace }
            beakWidth={ beakWidth }
            directionalHintFixed={ edgeFixed }
            items={
              [
                {
                  key: 'newItem',
                  name: 'New',
                  icon: 'Add',
                  subMenuProps: {
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
                  itemType: ContextualMenuItemType.Divider
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
                {
                  key: 'display',
                  name: 'display'
                },
                {
                  key: 'properties',
                  name: 'Properties'
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
  private _onFixEdgeChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      edgeFixed: isVisible
    });
  }

  @autobind
  private _onUseRtlHintChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      useDirectionalHintForRtl: isVisible
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
      directionalHint: (DirectionalHint as any)[option.key]
    });
  }

  @autobind
  private _onDirectionalRtlChanged(option: IDropdownOption) {
    this.setState({
      directionalHintForRTL: (DirectionalHint as any)[option.key]
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
