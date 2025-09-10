import * as React from 'react';
import type { Meta } from '@storybook/react';
import { ProgressBar } from '@fluentui/react-progress';
import { Steps, type StoryParameters } from 'storywright';
import { makeStyles } from '@griffel/react';

import { getStoryVariant, TestWrapperDecoratorFixedWidth, DARK_MODE, HIGH_CONTRAST, RTL } from '../utilities';

const useStyles = makeStyles({
  paused: {
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: '-1s !important',
    },
  },
});

export default {
  title: 'ProgressBar converged',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof ProgressBar>;

export const IndeterminateThickness = () => (
  <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
    <ProgressBar />
    <ProgressBar thickness="large" />
  </div>
);
IndeterminateThickness.storyName = 'Indeterminate + thickness';

export const IndeterminateThicknessDarkMode = getStoryVariant(IndeterminateThickness, DARK_MODE);

export const IndeterminateThicknessHighContrast = getStoryVariant(IndeterminateThickness, HIGH_CONTRAST);

export const IndeterminateThicknessRTL = getStoryVariant(IndeterminateThickness, RTL);

export const DeterminateThickness = () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
    <ProgressBar value={0.5} />
    <ProgressBar value={0.5} thickness="large" />
  </div>
);
DeterminateThickness.storyName = 'Determinate + thickness';

export const DeterminateThicknessDarkMode = getStoryVariant(DeterminateThickness, DARK_MODE);

export const DeterminateThicknessHighContrast = getStoryVariant(DeterminateThickness, HIGH_CONTRAST);

export const DeterminateThicknessRTL = getStoryVariant(DeterminateThickness, RTL);

export const Error = () => <ProgressBar value={0.5} color="error" />;

export const Warning = () => <ProgressBar value={0.5} color="warning" />;

export const Success = () => <ProgressBar value={1} color="success" />;
