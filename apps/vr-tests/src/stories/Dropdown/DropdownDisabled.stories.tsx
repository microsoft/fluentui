import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react';

export default {
  title: 'Dropdown Disabled',

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
        .end(),
    ),
  ],
};

export const Root = () => (
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
);
