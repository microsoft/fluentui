import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Textarea } from '@fluentui/react-textarea';
import { FluentProvider } from '@fluentui/react-provider';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Textarea Converged',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Textarea>;

export const SizeSmall = () => <Textarea size="small" placeholder="Placeholder" />;
SizeSmall.storyName = 'Size: small';

export const SizeMedium = () => <Textarea size="medium" placeholder="Placeholder" />;
SizeMedium.storyName = 'Size: medium';

export const SizeLarge = () => <Textarea size="large" placeholder="Placeholder" />;
SizeLarge.storyName = 'Size: large';

export const Disabled = () => <Textarea defaultValue="Example Textarea value" disabled />;
export const DisabledPlaceholder = () => <Textarea placeholder="Example Textarea placeholder" disabled />;
DisabledPlaceholder.storyName = 'Disabled + placeholder';

export const DisabledFilled = () => (
  <Textarea appearance="filled-darker" defaultValue="Example Textarea value" disabled />
);
DisabledFilled.storyName = 'Disabled + filled';

export const WithAppearanceOverride = () => (
  <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Textarea placeholder="Default overriden appearance" />
      <Textarea appearance="outline" placeholder="Outline appearance" />
    </div>
  </FluentProvider>
);
WithAppearanceOverride.storyName = 'With appearance override';
