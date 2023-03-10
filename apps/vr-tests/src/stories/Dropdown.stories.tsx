import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownProps,
  Icon,
  IDropdownOption,
} from '@fluentui/react';

storiesOf('Dropdown', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Dropdown')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Dropdown')
        .hover('.ms-Dropdown')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover('.ms-Dropdown-item')
        .snapshot('hover item', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
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
    ),
    { includeRtl: true },
  )
  .addStory('Disabled option selected', () => (
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
  ))
  .addStory(
    'Multiselect',
    () => (
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
    ),
    { includeRtl: true },
  )
  .addStory(
    'Custom Dropdown',
    () => (
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
        onRenderCaretDown={(props: IDropdownProps): JSX.Element => {
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
    ),
    { includeRtl: true },
  )
  .addStory('Required', () => (
    <Dropdown
      placeholder="Select an Option"
      label="Required dropdown example:"
      required={true}
      options={[
        { key: 'A', text: 'Option a' },
        { key: 'B', text: 'Option b' },
      ]}
    />
  ))
  .addStory('Required without label', () => (
    <Dropdown
      placeholder="Select an Option"
      required={true}
      options={[
        { key: 'A', text: 'Option a' },
        { key: 'B', text: 'Option b' },
      ]}
    />
  ));

storiesOf('Dropdown Disabled', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Dropdown')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Dropdown')
        .hover('.ms-Dropdown')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => (
    <Dropdown
      placeholder="Select an Option"
      label="Basic example:"
      ariaLabel="Basic dropdown example"
      disabled
      options={[
        { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option a' },
        { key: 'B', text: 'Option b' },
        { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
        { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
        { key: 'F', text: 'Option f' },
        { key: 'G', text: 'Option g' },
      ]}
    />
  ));
