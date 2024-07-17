import * as React from 'react';
import { Steps } from 'storywright';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownProps,
  Icon,
  IDropdownOption,
} from '@fluentui/react';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'Dropdown',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Dropdown')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Dropdown')
        .hover('.ms-Dropdown')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover('.ms-Dropdown-item')
        .snapshot('hover item', { cropTo: '.ms-Layer' })
        .end(),
    ),
  ],
};

export const Root = () => (
  <Dropdown
    placeholder="Select an Option"
    label="Basic example:"
    ariaLabel="Basic dropdown example"
    options={[
      { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
      { key: 'A', text: 'Option a' },
      { key: 'B', text: 'Option b' },
      { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
      { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
      { key: 'F', text: 'Option f', disabled: true },
      { key: 'G', text: 'Option g' },
      { key: 'Long', text: 'Option long long long long long long long long long' },
    ]}
  />
);

export const RootRTL = getStoryVariant(Root, RTL);

export const DisabledOptionSelected = () => (
  <Dropdown
    placeholder="Select an Option"
    label="Basic example:"
    defaultSelectedKey="F"
    ariaLabel="Basic dropdown example"
    options={[
      { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
      { key: 'A', text: 'Option a' },
      { key: 'B', text: 'Option b' },
      { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
      { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
      { key: 'F', text: 'Option f', disabled: true },
      { key: 'G', text: 'Option g' },
    ]}
  />
);

DisabledOptionSelected.storyName = 'Disabled option selected';

export const Multiselect = () => (
  <Dropdown
    placeholder="Select options"
    label="Multi-Select example:"
    defaultSelectedKeys={['Orange', 'Lemon']}
    multiSelect
    options={[
      { key: 'Header2', text: 'Fruits', itemType: DropdownMenuItemType.Header },
      { key: 'Apple', text: 'apple' },
      { key: 'Banana', text: 'banana', disabled: true },
      { key: 'Lemon', text: 'lemon', disabled: true },
      { key: 'Orange', text: 'orange' },
      { key: 'Long', text: 'Option long long long long long long long long long' },
    ]}
  />
);

export const MultiselectRTL = getStoryVariant(Multiselect, RTL);

export const CustomDropdown = () => (
  <Dropdown
    placeholder="Select an Option"
    label="Custom example:"
    id="Customdrop1"
    ariaLabel="Custom dropdown example"
    onRenderPlaceholder={(props: IDropdownProps): JSX.Element => {
      return (
        <div className="dropdownExample-placeholder">
          <Icon style={{ marginRight: '8px' }} iconName={'MessageFill'} aria-hidden="true" />
          <span>{props.placeholder}</span>
        </div>
      );
    }}
    onRenderTitle={(options: IDropdownOption[]): JSX.Element => {
      const option = options[0];

      return (
        <div>
          {option.data && option.data.icon && (
            <Icon
              style={{ marginRight: '8px' }}
              iconName={option.data.icon}
              aria-hidden="true"
              title={option.data.icon}
            />
          )}
          <span>{option.text}</span>
        </div>
      );
    }}
    onRenderOption={(option: IDropdownOption): JSX.Element => {
      return (
        <div>
          {option.data && option.data.icon && (
            <Icon
              style={{ marginRight: '8px' }}
              iconName={option.data.icon}
              aria-hidden="true"
              title={option.data.icon}
            />
          )}
          <span>{option.text}</span>
        </div>
      );
    }}
    onRenderCaretDown={(): JSX.Element => {
      return <Icon iconName="CirclePlus" />;
    }}
    options={[
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
    ]}
  />
);

export const CustomDropdownRTL = getStoryVariant(CustomDropdown, RTL);

export const Required = () => (
  <Dropdown
    placeholder="Select an Option"
    label="Required dropdown example:"
    required={true}
    options={[
      { key: 'A', text: 'Option a' },
      { key: 'B', text: 'Option b' },
    ]}
  />
);

export const RequiredWithoutLabel = () => (
  <Dropdown
    placeholder="Select an Option"
    required={true}
    options={[
      { key: 'A', text: 'Option a' },
      { key: 'B', text: 'Option b' },
    ]}
  />
);

RequiredWithoutLabel.storyName = 'Required without label';
