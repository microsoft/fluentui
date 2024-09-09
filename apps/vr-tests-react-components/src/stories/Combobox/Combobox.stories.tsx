import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import type { Meta } from '@storybook/react';
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

export const AppearanceOutlineDefault = () => (
  <Combobox>
    <Option>text</Option>
  </Combobox>
);

AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceUnderline = () => (
  <Combobox appearance="underline">
    <Option>text</Option>
  </Combobox>
);

AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceFilledDarker = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox appearance="filled-darker">
      <Option>text</Option>
    </Combobox>
  </div>
);

AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox appearance="filled-lighter">
      <Option>text</Option>
    </Combobox>
  </div>
);

AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const Disabled = () => (
  <Combobox disabled>
    <Option>text</Option>
  </Combobox>
);

export const DisabledWithValue = () => (
  <Combobox disabled value="text">
    <Option>text</Option>
  </Combobox>
);

DisabledWithValue.storyName = 'Disabled with value';

export const InvalidOutline = () => (
  <Combobox aria-invalid>
    <Option>text</Option>
  </Combobox>
);

InvalidOutline.storyName = 'Invalid: outline';

export const InvalidUnderline = () => (
  <Combobox aria-invalid appearance="underline">
    <Option>text</Option>
  </Combobox>
);

InvalidUnderline.storyName = 'Invalid: underline';

export const InvalidFilledDarker = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox aria-invalid appearance="filled-darker">
      <Option>text</Option>
    </Combobox>
  </div>
);

InvalidFilledDarker.storyName = 'Invalid: filled-darker';

export const InvalidFilledLighter = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Combobox aria-invalid appearance="filled-lighter">
      <Option>text</Option>
    </Combobox>
  </div>
);

InvalidFilledLighter.storyName = 'Invalid: filled-lighter';

export const WithPlaceholder = () => (
  <Combobox placeholder="Color">
    <Option>text</Option>
  </Combobox>
);

WithPlaceholder.storyName = 'With placeholder';

export const WithValue = () => (
  <Combobox value="Text text">
    <Option>text</Option>
  </Combobox>
);

WithValue.storyName = 'With value';

export const SizeSmall = () => (
  <Combobox size="small">
    <Option>text</Option>
  </Combobox>
);

SizeSmall.storyName = 'Size: small';

export const SizeLarge = () => (
  <Combobox size="large">
    <Option>text</Option>
  </Combobox>
);

SizeLarge.storyName = 'Size: large';
