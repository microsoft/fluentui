import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DirectionalHint, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind, getRTL } from 'office-ui-fabric-react/lib/Utilities';
import './ContextualMenuExample.scss';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export interface IContextualMenuDirectionalExampleState {
  directionalHint?: DirectionalHint;
  directionalHintForRTL?: DirectionalHint;
  useDirectionalHintForRtl?: boolean;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
  edgeFixed?: boolean;
}

const DIRECTION_OPTIONS = [{ key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
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
{ key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' },
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
      isBeakVisible: false,
      directionalHint: DirectionalHint.bottomLeftEdge,
      directionalHintForRTL: DirectionalHint.bottomLeftEdge,
      useDirectionalHintForRtl: false,
      gapSpace: 0,
      beakWidth: 20,
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
      useDirectionalHintForRtl
    } = this.state;

    return (
      <div className='ms-ContextualMenuDirectionalExample'>
        <div className='ms-ContextualMenuDirectionalExample-configArea'>
          <Checkbox
            className={ exampleStyles.exampleCheckbox }
            label='Show beak'
            checked={ isBeakVisible }
            onChange={ this._onShowBeakChange }
          />
          <Dropdown
            label='Directional hint'
            selectedKey={ directionalHint! }
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged }
          />
          { getRTL() &&
            <Checkbox label='Use RTL directional hint' checked={ useDirectionalHintForRtl } onChange={ this._onUseRtlHintChange } />
          }
          { getRTL() &&
            <Dropdown
              label='Directional hint for RTL'
              selectedKey={ directionalHintForRTL! }
              options={ DIRECTION_OPTIONS }
              onChanged={ this._onDirectionalRtlChanged }
              disabled={ !useDirectionalHintForRtl }
            />
          }
        </div>
        <div className='ms-ContextualMenuDirectionalExample-buttonArea' ref='menuButton'>
          <DefaultButton
            text='Show context menu'
            menuProps={ {
              isBeakVisible: isBeakVisible,
              directionalHint: directionalHint,
              directionalHintForRTL: useDirectionalHintForRtl ? directionalHintForRTL : undefined,
              gapSpace: gapSpace,
              beakWidth: beakWidth,
              directionalHintFixed: edgeFixed,
              items: [
                {
                  key: 'newItem',
                  name: 'New'
                },
                {
                  key: 'divider_1',
                  itemType: ContextualMenuItemType.Divider
                },
                {
                  key: 'rename',
                  name: 'Rename'
                },
                {
                  key: 'edit',
                  name: 'Edit'
                },
                {
                  key: 'properties',
                  name: 'Properties'
                },
                {
                  key: 'disabled',
                  name: 'Disabled item',
                  disabled: true
                }
              ]
            }
            }
          />
        </div>
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
  private _onUseRtlHintChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      useDirectionalHintForRtl: isVisible
    });
  }

  @autobind
  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: option.key as number
    });
  }

  @autobind
  private _onDirectionalRtlChanged(option: IDropdownOption) {
    this.setState({
      directionalHintForRTL: option.key as number
    });
  }

}
