import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Select } from '@fluentui/react-select';
import { FluentProvider } from '@fluentui/react-provider';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Select Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Select>;

export const WithValue = () => (
  <Select>
    <option>Red</option>
    <option selected>Green</option>
    <option>Blue</option>
  </Select>
);
WithValue.storyName = 'With value';

export const Disabled = () => (
  <Select disabled>
    <option>text</option>
  </Select>
);

export const SizeSmall = () => (
  <Select size="small">
    <option>text</option>
  </Select>
);
SizeSmall.storyName = 'Size: small';

export const SizeLarge = () => (
  <Select size="large">
    <option>text</option>
  </Select>
);
SizeLarge.storyName = 'Size: large';

export const CustomIcon = () => (
  <Select icon="+">
    <option>text</option>
  </Select>
);

export const WithAppearanceOverride = () => (
  <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Select>
        <option>Default overriden appearance</option>
      </Select>
      <Select appearance="outline">
        <option>Outline appearance</option>
      </Select>
    </div>
  </FluentProvider>
);
WithAppearanceOverride.storyName = 'With appearance override';
