import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Tooltip } from '@fluentui/react-tooltip';

import { useStyles } from './utils';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, type StoryParameters } from 'storywright';

export default {
  title: 'Tooltip Converged',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Tooltip>;

export const Basic = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible content="This is a tooltip" relationship="description">
      <button>Target</button>
    </Tooltip>
  </div>
);
Basic.storyName = 'basic';

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const BasicHighContrast = getStoryVariant(Basic, HIGH_CONTRAST);

export const Inverted = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible appearance="inverted" content="Inverted tooltip" relationship="description">
      <button>Target</button>
    </Tooltip>
  </div>
);
Inverted.storyName = 'inverted';

export const InvertedDarkMode = getStoryVariant(Inverted, DARK_MODE);

export const WithArrow = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible withArrow content="Tooltip with an arrow" relationship="description">
      <button>Target</button>
    </Tooltip>
  </div>
);
WithArrow.storyName = 'withArrow';

export const WithArrowDarkMode = getStoryVariant(WithArrow, DARK_MODE);

export const WithArrowHighContrast = getStoryVariant(WithArrow, HIGH_CONTRAST);

export const InvertedWithArrow = () => (
  <div className={useStyles().wrapper}>
    <Tooltip
      visible
      appearance="inverted"
      withArrow
      content="Inverted tooltip with an arrow"
      relationship="description"
    >
      <button>Target</button>
    </Tooltip>
  </div>
);
InvertedWithArrow.storyName = 'inverted withArrow';

export const InvertedWithArrowDarkMode = getStoryVariant(InvertedWithArrow, DARK_MODE);

export const TextWrapping = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible content="This tooltip's text is long enough to wrap to a new line" relationship="description">
      <button>Target</button>
    </Tooltip>
  </div>
);
TextWrapping.storyName = 'text-wrapping';

export const OverflowWrap = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible content="Thistooltiptextislongenoughtobebrokenintoanewline" relationship="description">
      <button>Target</button>
    </Tooltip>
  </div>
);
OverflowWrap.storyName = 'overflow-wrap';

export const OverflowWrapWithArrow = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible withArrow content="Thistooltiptextislongenoughtobebrokenintoanewline" relationship="description">
      <button>Target</button>
    </Tooltip>
  </div>
);
OverflowWrapWithArrow.storyName = 'overflow-wrap withArrow';

export const SecondaryContent = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible withArrow content="Bold" secondaryContent="Ctrl+B" relationship="label">
      <button>Target</button>
    </Tooltip>
  </div>
);

export const SecondaryContentDarkMode = getStoryVariant(SecondaryContent, DARK_MODE);
export const SecondaryContentHighContrast = getStoryVariant(SecondaryContent, HIGH_CONTRAST);
export const SecondaryContentRtl = getStoryVariant(SecondaryContent, RTL);

export const SecondaryContentInverted = () => (
  <div className={useStyles().wrapper}>
    <Tooltip visible withArrow appearance="inverted" content="Bold" secondaryContent="Ctrl+B" relationship="label">
      <button>Target</button>
    </Tooltip>
  </div>
);

export const SecondaryContentInvertedDarkMode = getStoryVariant(SecondaryContentInverted, DARK_MODE);
export const SecondaryContentInvertedHighContrast = getStoryVariant(SecondaryContentInverted, HIGH_CONTRAST);

export const SecondaryContentWrapping = () => (
  <div className={useStyles().wrapper}>
    <Tooltip
      visible
      withArrow
      content={{ children: 'Shared', style: { maxWidth: '140px' } }}
      secondaryContent="Available to everyone in this organization"
      relationship="description"
    >
      <button>Target</button>
    </Tooltip>
  </div>
);

export const SecondaryContentOverflowWrap = () => (
  <div className={useStyles().wrapper}>
    <Tooltip
      visible
      content="Shared"
      secondaryContent="Thissecondarycontentislongenoughtobebrokenintoanewline"
      relationship="description"
    >
      <button>Target</button>
    </Tooltip>
  </div>
);

export const SecondaryContentWrappingRtl = getStoryVariant(SecondaryContentWrapping, RTL);
