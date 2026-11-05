import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { RangeSlider } from '@fluentui/react-range-slider-preview';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'RangeSlider Converged',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .focus('.fui-RangeSlider__startInput')
        .snapshot('start thumb focused', { cropTo: '.testWrapper' })
        .focus('.fui-RangeSlider__endInput')
        .snapshot('end thumb focused', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof RangeSlider>;

export const Focus = () => <RangeSlider defaultValue={{ start: 20, end: 80 }} />;
Focus.storyName = 'Focus';

export const FocusHighContrast = getStoryVariant(Focus, HIGH_CONTRAST);

export const FocusDarkMode = getStoryVariant(Focus, DARK_MODE);

// The focused thumb is drawn on top of the other one
export const FocusOverlapping = () => <RangeSlider defaultValue={{ start: 50, end: 50 }} />;
FocusOverlapping.storyName = 'Focus - overlapping thumbs';

// A thumb disabled through its slot stays focusable; the enabled thumb stays on top
export const FocusStartThumbDisabledOverlapping = () => (
  <RangeSlider defaultValue={{ start: 50, end: 50 }} startInput={{ disabled: true }} />
);
FocusStartThumbDisabledOverlapping.storyName = 'Focus - start thumb disabled, overlapping thumbs';
