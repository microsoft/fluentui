import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { InfoLabel } from '@fluentui/react-infolabel';

import {
  DARK_MODE,
  getStoryVariant,
  HIGH_CONTRAST,
  RTL,
  TestWrapperDecoratorFixedWidth,
  withStoryWrightSteps,
} from '../utilities';

export default {
  title: 'InfoLabel',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof InfoLabel>;

export const Default = () => <InfoLabel info="Test">This is an info label</InfoLabel>;
Default.storyName = 'default';

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const DefaultRTL = getStoryVariant(Default, RTL);

export const Wrap = () => (
  <InfoLabel info="Test">
    This is a very long info label that should wrap to multiple lines and put the info button on the last line
  </InfoLabel>
);
Wrap.storyName = 'wrap';

export const SizeSmall = () => (
  <InfoLabel size="small" info="Test">
    This is a small info label
  </InfoLabel>
);
SizeSmall.storyName = 'size:small';

export const SizeLarge = () => (
  <InfoLabel size="large" info="Test">
    This is a large info label
  </InfoLabel>
);
SizeLarge.storyName = 'size:large';

export const Required = () => (
  <InfoLabel required info="Test">
    This is a required info label
  </InfoLabel>
);
Required.storyName = 'required';

export const RequiredRTL = getStoryVariant(Required, RTL);

export const SizesOpen = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '60px',
      paddingLeft: '10px',
      paddingBottom: '10px',
      gap: '80px',
      alignItems: 'start',
    }}
  >
    <InfoLabel size="small" info="This is the content of an InfoButton." infoButton={{ popover: { open: true } }} />
    <InfoLabel size="medium" info="This is the content of an InfoButton." infoButton={{ popover: { open: true } }} />
    <InfoLabel size="large" info="This is the content of an InfoButton." infoButton={{ popover: { open: true } }} />
  </div>
);
SizesOpen.storyName = 'sizes -- open';
