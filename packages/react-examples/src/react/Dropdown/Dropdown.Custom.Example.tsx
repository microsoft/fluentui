import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { IconButton } from '@fluentui/react/lib/Button';

const exampleOptions: IDropdownOption[] = [
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
  { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } },
];

const stackTokens: IStackTokens = { childrenGap: 20 };
const iconStyles = { marginRight: '8px' };

const onRenderLabel = (props: IDropdownProps): JSX.Element => {
  return (
    <Stack horizontal verticalAlign="center">
      <Label>{props.label}</Label>
      <IconButton
        iconProps={{ iconName: 'Info' }}
        title="Info"
        ariaLabel="Info"
        styles={{ root: { marginBottom: -3 } }}
      />
    </Stack>
  );
};

const onRenderOption = (option: IDropdownOption): JSX.Element => {
  return (
    <div>
      {option.data && option.data.icon && (
        <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
      )}
      <span>{option.text}</span>
    </div>
  );
};

const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
  const option = options[0];

  return (
    <div>
      {option.data && option.data.icon && (
        <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
      )}
      <span>{option.text}</span>
    </div>
  );
};

const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="CirclePlus" />;
};

const onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
  return (
    <div className="dropdownExample-placeholder">
      <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" />
      <span>{props.placeholder}</span>
    </div>
  );
};

const dropdownStyles = { dropdown: { width: 300 } };

export const DropdownCustomExample: React.FunctionComponent = () => (
  <Stack tokens={stackTokens}>
    <Dropdown
      placeholder="Select an option"
      label="Custom example"
      ariaLabel="Custom dropdown example"
      onRenderPlaceholder={onRenderPlaceholder}
      onRenderTitle={onRenderTitle}
      onRenderOption={onRenderOption}
      onRenderCaretDown={onRenderCaretDown}
      styles={dropdownStyles}
      options={exampleOptions}
    />

    <Dropdown
      placeholder="Select an option"
      label="Custom label"
      ariaLabel="Custom dropdown label example"
      styles={dropdownStyles}
      options={exampleOptions}
      onRenderLabel={onRenderLabel}
    />
  </Stack>
);
