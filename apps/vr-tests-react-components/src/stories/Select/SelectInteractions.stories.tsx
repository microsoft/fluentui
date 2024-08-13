import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Select } from '@fluentui/react-select';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Select Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('select')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .focus('select')
          .wait(250) // let focus border animation finish
          .snapshot('focused', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<typeof Select>;

export const AppearanceOutlineDefault = () => (
  <Select>
    <option>text</option>
  </Select>
);
AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceUnderline = () => (
  <Select appearance="underline">
    <option>text</option>
  </Select>
);
AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceFilledDarker = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Select appearance="filled-darker">
      <option>text</option>
    </Select>
  </div>
);
AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Select appearance="filled-lighter">
      <option>text</option>
    </Select>
  </div>
);
AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const InvalidOutline = () => (
  <Select aria-invalid>
    <option>text</option>
  </Select>
);
InvalidOutline.storyName = 'Invalid: outline';

export const InvalidUnderline = () => (
  <Select aria-invalid appearance="underline">
    <option>text</option>
  </Select>
);
InvalidUnderline.storyName = 'Invalid: underline';

export const InvalidFilledDarker = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Select aria-invalid appearance="filled-darker">
      <option>text</option>
    </Select>
  </div>
);
InvalidFilledDarker.storyName = 'Invalid: filled-darker';

export const InvalidFilledLighter = () => (
  <div style={{ background: '#00335c', padding: '10px' }}>
    <Select aria-invalid appearance="filled-lighter">
      <option>text</option>
    </Select>
  </div>
);
InvalidFilledLighter.storyName = 'Invalid: filled-lighter';
