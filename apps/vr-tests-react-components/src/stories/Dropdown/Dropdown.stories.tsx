import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { Dropdown, Option } from '@fluentui/react-combobox';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Dropdown Converged',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('[role=combobox]')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .focus('[role=combobox]')
          .wait(250) // let focus border animation finish
          .snapshot('focused', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export const AppearanceOutlineDefault = () => (
  <Dropdown>
    <Option>text</Option>
  </Dropdown>
);
AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceUnderline = () => (
  <Dropdown appearance="underline">
    <Option>text</Option>
  </Dropdown>
);
AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceFilledDarker = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Dropdown appearance="filled-darker">
      <Option>text</Option>
    </Dropdown>
  </div>
);
AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Dropdown appearance="filled-lighter">
      <Option>text</Option>
    </Dropdown>
  </div>
);
AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const Disabled = () => (
  <Dropdown disabled>
    <Option>text</Option>
  </Dropdown>
);

export const DisabledWithValue = () => (
  <Dropdown disabled value="text">
    <Option>text</Option>
  </Dropdown>
);
DisabledWithValue.storyName = 'Disabled with value';

export const InvalidOutline = () => (
  <Dropdown aria-invalid>
    <Option>text</Option>
  </Dropdown>
);
InvalidOutline.storyName = 'Invalid: outline';

export const InvalidUnderline = () => (
  <Dropdown aria-invalid appearance="underline">
    <Option>text</Option>
  </Dropdown>
);
InvalidUnderline.storyName = 'Invalid: underline';

export const InvalidFilledDarker = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Dropdown aria-invalid appearance="filled-darker">
      <Option>text</Option>
    </Dropdown>
  </div>
);
InvalidFilledDarker.storyName = 'Invalid: filled-darker';

export const InvalidFilledLighter = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Dropdown aria-invalid appearance="filled-lighter">
      <Option>text</Option>
    </Dropdown>
  </div>
);
InvalidFilledLighter.storyName = 'Invalid: filled-lighter';

export const WithPlaceholder = () => (
  <Dropdown placeholder="Select a Color">
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);
WithPlaceholder.storyName = 'With placeholder';

export const WithValue = () => (
  <Dropdown value="Text text">
    <Option>text</Option>
  </Dropdown>
);
WithValue.storyName = 'With value';

export const WithMultiselectValue = () => (
  <Dropdown multiselect value="Green, Red" selectedOptions={['Green', 'Red']}>
    <Option>Red</Option>
    <Option>Green</Option>
    <Option>Blue</Option>
  </Dropdown>
);
WithMultiselectValue.storyName = 'With multiselect value';

export const SizeSmall = () => (
  <Dropdown size="small">
    <Option>text</Option>
  </Dropdown>
);
SizeSmall.storyName = 'Size: small';

export const SizeLarge = () => (
  <Dropdown size="large">
    <Option>text</Option>
  </Dropdown>
);
SizeLarge.storyName = 'Size: large';
