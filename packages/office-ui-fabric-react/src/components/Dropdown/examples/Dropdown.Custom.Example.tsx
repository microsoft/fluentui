import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

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

const onRenderLabel = (props: IDropdownProps): JSX.Element => {
  return (
    <Stack horizontal verticalAlign="center">
      <span style={{ fontWeight: 600 }}>{props.label}</span>
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
        <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
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
        <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
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
      <Icon style={{ marginRight: '8px' }} iconName={'MessageFill'} aria-hidden="true" />
      <span>{props.placeholder}</span>
    </div>
  );
};

export const DropdownCustomExample: React.FC = () => (
  <Stack tokens={stackTokens}>
    <Dropdown
      placeholder="Select an option"
      label="Custom example"
      ariaLabel="Custom dropdown example"
      onRenderPlaceholder={onRenderPlaceholder}
      onRenderTitle={onRenderTitle}
      onRenderOption={onRenderOption}
      onRenderCaretDown={onRenderCaretDown}
      styles={{ dropdown: { width: 300 } }}
      options={exampleOptions}
    />

    <Dropdown
      placeholder="Select an option"
      label="Custom label"
      ariaLabel="Custom dropdown label example"
      styles={{ dropdown: { width: 300 } }}
      options={exampleOptions}
      onRenderLabel={onRenderLabel}
    />
  </Stack>
);
