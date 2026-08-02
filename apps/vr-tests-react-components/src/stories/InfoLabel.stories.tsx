import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { InfoLabel } from '@fluentui/react-infolabel';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, TestWrapperDecoratorFixedWidth } from '../utilities';

export default {
  title: 'InfoLabel',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: { steps: new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
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

/*
 * S-J state-matrix story (migration/griffel-to-tailwind/reports/griffel-zero-plan.md §2.2):
 * InfoButton's bundled-icon rules fire at rest (regular shown), on `open` (SizesOpen below)
 * and on `:hover` — the hover half had no pixel evidence, since every story above snapshots
 * `rest` only. The base → open → hover file-position order is load-bearing (all 0-2-0), so
 * the hover snapshot pins the last block in that chain.
 */
export const InfoButtonHover = () => <InfoLabel info="Test" infoButton={{ className: 'mouse-target' }} />;
InfoButtonHover.storyName = 'infobutton -- hover';
InfoButtonHover.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('rest', { cropTo: '.testWrapper' })
      .hover('.mouse-target')
      .snapshot('hover', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

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
