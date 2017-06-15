import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import './Dropdown.Basic.Example.scss';
import { DropdownMenuItemType, IDropdownOption, IDropdownProps } from './../Dropdown.Props';
import { Icon } from '../../Icon';

export class DropdownCustomExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectedItem: null
    };
  }

  public render() {
    let { selectedItem } = this.state;

    return (
      <div className='dropdownExample'>

        <Dropdown
          placeHolder='Select an Option'
          label='Custom example:'
          id='Customdrop1'
          ariaLabel='Custom dropdown example'
          onRenderPlaceHolder={ this._onRenderPlaceHolder }
          onRenderTitle={ this._onRenderOption }
          onRenderOption={ this._onRenderOption }
          options={
            [
              { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
              { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
              { key: 'B', text: 'Option b', data: { icon: 'Print' } },
              { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
              { key: 'D', text: 'Option d', data: { icon: 'Train' } },
              { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
              { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
              { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
              { key: 'F', text: 'Option f', data: { icon: 'Running' } },
              { key: 'G', text: 'Option g', data: { icon: 'EmojiNeutral' } },
              { key: 'H', text: 'Option h', data: { icon: 'ChatInviteFriend' } },
              { key: 'I', text: 'Option i', data: { icon: 'SecurityGroup' } },
              { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } },
            ]
          }
        />

      </div>

    );
  }

  private _onRenderOption = (option: IDropdownOption): JSX.Element => {
    return (
      <div className='dropdownExample-option'>
        { option.data && option.data.icon &&
          <Icon
            style={ { marginRight: '8px' } }
            iconName={ option.data.icon }
            aria-hidden='true'
            title={ option.data.icon }
          />
        }
        <span>{ option.text }</span>
      </div>
    );
  }

  private _onRenderPlaceHolder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className='dropdownExample-placeholder'>
        <Icon
          style={ { marginRight: '8px' } }
          iconName={ 'MessageFill' }
          aria-hidden='true'
        />
        <span>{ props.placeHolder }</span>
      </div>
    );
  }

}
