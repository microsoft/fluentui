import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Input } from '@fluentui/react-input';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { FluentProvider } from '@fluentui/react-provider';

import { getStoryVariant, withStoryWrightSteps, TestWrapperDecoratorFixedWidth, RTL } from '../../utilities';

export default {
  title: 'Input Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Input>;

export const SizeSmall = () => <Input size="small" placeholder="Placeholder" />;
SizeSmall.storyName = 'Size: small';

export const SizeLarge = () => <Input size="large" placeholder="Placeholder" />;
SizeLarge.storyName = 'Size: large';

export const Inline = () => (
  <p>
    Some text with <Input placeholder="hello" style={{ width: '75px' }} /> inline input
  </p>
);

export const ContentBefore = () => (
  <Input contentBefore={<SearchRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />
);
ContentBefore.storyName = 'contentBefore';

export const ContentBeforeRTL = getStoryVariant(ContentBefore, RTL);

export const ContentAfter = () => (
  <Input contentAfter={<DismissRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />
);
ContentAfter.storyName = 'contentAfter';

export const ContentAfterRTL = getStoryVariant(ContentAfter, RTL);

export const WithAppearanceOverride = () => (
  <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input placeholder="Default overriden appearance" />
      <Input appearance="outline" placeholder="Outline appearance" />
    </div>
  </FluentProvider>
);
WithAppearanceOverride.storyName = 'With appearance override';
