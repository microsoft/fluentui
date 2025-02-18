import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Tooltip } from '@fluentui/react-tooltip';

import { useStyles } from './utils';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, TestWrapperDecorator } from '../../utilities';
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
