import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import type { Meta, StoryFn } from '@storybook/react';
import { Combobox, Option } from '@fluentui/react-combobox';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Combobox Converged',
  component: Combobox,
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .focus('input')
          .wait(250) // let focus border animation finish
          .snapshot('focused', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof Combobox>;

type Story = StoryFn<typeof Combobox>;

export const AppearanceOutlineDefault: Story = () => (
  <Combobox>
    <Option>text</Option>
  </Combobox>
);

AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceUnderline: Story = () => (
  <Combobox appearance="underline">
    <Option>text</Option>
  </Combobox>
);

AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceFilledDarker: Story = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox appearance="filled-darker">
      <Option>text</Option>
    </Combobox>
  </div>
);

AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter: Story = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox appearance="filled-lighter">
      <Option>text</Option>
    </Combobox>
  </div>
);

AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const Disabled: Story = () => (
  <Combobox disabled>
    <Option>text</Option>
  </Combobox>
);

export const DisabledWithValue: Story = () => (
  <Combobox disabled value="text">
    <Option>text</Option>
  </Combobox>
);

DisabledWithValue.storyName = 'Disabled with value';

export const InvalidOutline: Story = () => (
  <Combobox aria-invalid>
    <Option>text</Option>
  </Combobox>
);

InvalidOutline.storyName = 'Invalid: outline';

export const InvalidUnderline: Story = () => (
  <Combobox aria-invalid appearance="underline">
    <Option>text</Option>
  </Combobox>
);

InvalidUnderline.storyName = 'Invalid: underline';

export const InvalidFilledDarker: Story = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox aria-invalid appearance="filled-darker">
      <Option>text</Option>
    </Combobox>
  </div>
);

InvalidFilledDarker.storyName = 'Invalid: filled-darker';

export const InvalidFilledLighter: Story = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox aria-invalid appearance="filled-lighter">
      <Option>text</Option>
    </Combobox>
  </div>
);

InvalidFilledLighter.storyName = 'Invalid: filled-lighter';

export const WithPlaceholder: Story = () => (
  <Combobox placeholder="Color">
    <Option>text</Option>
  </Combobox>
);

WithPlaceholder.storyName = 'With placeholder';

export const WithValue: Story = () => (
  <Combobox value="Text text">
    <Option>text</Option>
  </Combobox>
);

WithValue.storyName = 'With value';

export const SizeSmall: Story = () => (
  <Combobox size="small">
    <Option>text</Option>
  </Combobox>
);

SizeSmall.storyName = 'Size: small';

export const SizeLarge: Story = () => (
  <Combobox size="large">
    <Option>text</Option>
  </Combobox>
);

SizeLarge.storyName = 'Size: large';
