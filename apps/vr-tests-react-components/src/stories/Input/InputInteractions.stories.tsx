import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Input } from '@fluentui/react-input';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Input Converged',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .click('input')
          .wait(250) // let focus border animation finish
          .snapshot('focused', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<typeof Input>;

export const AppearanceOutlineDefault = () => <Input placeholder="Placeholder" />;
AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceUnderline = () => <Input appearance="underline" placeholder="Placeholder" />;
AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceFilledDarker = () => <Input appearance="filled-darker" placeholder="Placeholder" />;
AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <Input appearance="filled-lighter" placeholder="Placeholder" />
  </div>
);
AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const InvalidAppearanceOutline = () => <Input aria-invalid placeholder="Placeholder" />;
InvalidAppearanceOutline.storyName = 'Invalid, appearance: outline';

export const InvalidAppearanceUnderline = () => <Input aria-invalid appearance="underline" placeholder="Placeholder" />;
InvalidAppearanceUnderline.storyName = 'Invalid, appearance: underline';

export const InvalidAppearanceFilledDarker = () => (
  <Input aria-invalid appearance="filled-darker" placeholder="Placeholder" />
);
InvalidAppearanceFilledDarker.storyName = 'Invalid, appearance: filled-darker';

export const InvalidAppearanceFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <Input aria-invalid appearance="filled-lighter" placeholder="Placeholder" />
  </div>
);
InvalidAppearanceFilledLighter.storyName = 'Invalid, appearance: filled-lighter';

export const DisabledAppearanceOutline = () => <Input disabled value="Disabled" />;
DisabledAppearanceOutline.storyName = 'Disabled, appearance: outline';

export const DisabledAppearanceUnderline = () => <Input disabled appearance="underline" value="Disabled" />;
DisabledAppearanceUnderline.storyName = 'Disabled, appearance: underline';

export const DisabledAppearanceFilledDarker = () => <Input disabled appearance="filled-darker" value="Disabled" />;
DisabledAppearanceFilledDarker.storyName = 'Disabled, appearance: filled-darker';

export const DisabledAppearanceFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <Input disabled appearance="filled-lighter" value="Disabled" />
  </div>
);
DisabledAppearanceFilledLighter.storyName = 'Disabled, appearance: filled-lighter';

export const WithValue = () => <Input defaultValue="Value!" />;
WithValue.storyName = 'With value';
