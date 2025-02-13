import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Textarea } from '@fluentui/react-textarea';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Textarea Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('textarea')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .click('textarea')
          .wait(250) // needed for bottom focus border animation
          .snapshot('focused', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<typeof Textarea>;

export const AppearanceOutlineDefault = () => <Textarea placeholder="Placeholder" />;
AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceFilledDarker = () => <Textarea appearance="filled-darker" placeholder="Placeholder" />;
AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter = () => (
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <Textarea appearance="filled-lighter" placeholder="Placeholder" />
  </div>
);
AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const InvalidOutline = () => <Textarea aria-invalid placeholder="Placeholder" />;
InvalidOutline.storyName = 'Invalid: outline';

export const InvalidFilledDarker = () => <Textarea aria-invalid appearance="filled-darker" placeholder="Placeholder" />;
InvalidFilledDarker.storyName = 'Invalid: filled-darker';

export const InvalidFilledLighter = () => (
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <Textarea aria-invalid appearance="filled-lighter" placeholder="Placeholder" />
  </div>
);
InvalidFilledLighter.storyName = 'Invalid: filled-lighter';

export const WithValue = () => <Textarea defaultValue="Value" />;
WithValue.storyName = 'With value';
