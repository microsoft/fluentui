import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export class DropdownCustomExample extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Dropdown
        placeholder="Select an option"
        label="Custom example"
        ariaLabel="Custom dropdown example"
        onRenderPlaceholder={this._onRenderPlaceholder}
        onRenderTitle={this._onRenderTitle}
        onRenderOption={this._onRenderOption}
        onRenderCaretDown={this._onRenderCaretDown}
        styles={{ dropdown: { width: 300 } }}
        options={[
          { key: 'Header', text: 'Options', itemType: DropdownMenuItemType.Header },
          { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
          { key: 'B', text: 'Option b', data: { icon: 'Print' } },
          { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
          { key: 'D', text: 'Option d', data: { icon: 'Train' } },
          { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
          { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
          { key: 'Header2', text: 'More options', itemType: DropdownMenuItemType.Header },
          { key: 'F', text: 'Option f', data: { icon: 'Running' } },
          { key: 'G', text: 'Option g', data: { icon: 'EmojiNeutral' } },
          { key: 'H', text: 'Option h', data: { icon: 'ChatInviteFriend' } },
          { key: 'I', text: 'Option i', data: { icon: 'SecurityGroup' } },
          { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } }
        ]}
      />
    );
  }

  private _onRenderOption = (option: IDropdownOption): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  private _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <Icon style={{ marginRight: '8px' }} iconName={'MessageFill'} aria-hidden="true" />
        <span>{props.placeholder}</span>
      </div>
    );
  };

  private _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="CirclePlus" />;
  };
}
