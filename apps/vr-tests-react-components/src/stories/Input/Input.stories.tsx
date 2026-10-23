import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { Input } from '@fluentui/react-input';
import { SearchRegular, DismissRegular, CalendarColor } from '@fluentui/react-icons';
import { FluentProvider } from '@fluentui/react-provider';

import { getStoryVariant, TestWrapperDecoratorFixedWidth, RTL, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

export default {
  title: 'Input Converged',
  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
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

export const IconSizes = () => (
  <>
    {(['small', 'medium', 'large'] as const).map(size => (
      <Input key={size} size={size} contentBefore={<SearchRegular />} contentAfter={<DismissRegular />} />
    ))}
  </>
);

export const IconSizesRTL = getStoryVariant(IconSizes, RTL);
export const IconSizesDarkMode = getStoryVariant(IconSizes, DARK_MODE);
export const IconSizesHighContrast = getStoryVariant(IconSizes, HIGH_CONTRAST);

export const MixedIconRenderers = () => <Input contentBefore={<CalendarColor />} contentAfter={<SearchRegular />} />;

export const WithAppearanceOverride = () => (
  <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input placeholder="Default overriden appearance" />
      <Input appearance="outline" placeholder="Outline appearance" />
    </div>
  </FluentProvider>
);
WithAppearanceOverride.storyName = 'With appearance override';
