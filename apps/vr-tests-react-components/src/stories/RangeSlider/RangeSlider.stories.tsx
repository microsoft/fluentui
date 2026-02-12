import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { RangeSlider } from '@fluentui/react-slider';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'RangeSlider Converged',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof RangeSlider>;

export const Horizontal0 = () => <RangeSlider defaultValue={{ start: 0, end: 0 }} />;
Horizontal0.storyName = 'Horizontal - 0%';

export const Horizontal0RTL = getStoryVariant(Horizontal0, RTL);

export const HorizontalMiddle = () => <RangeSlider defaultValue={{ start: 20, end: 80 }} />;
HorizontalMiddle.storyName = 'Horizontal - Middle';

export const HorizontalMiddleRTL = getStoryVariant(HorizontalMiddle, RTL);

export const Horizontal100 = () => <RangeSlider defaultValue={{ start: 100, end: 100 }} />;
Horizontal100.storyName = 'Horizontal - 100%';

export const Horizontal100RTL = getStoryVariant(Horizontal100, RTL);

export const HorizontalFullRange = () => <RangeSlider defaultValue={{ start: 0, end: 100 }} />;
HorizontalFullRange.storyName = 'Horizontal - Full Range';

export const Vertical0 = () => <RangeSlider vertical defaultValue={{ start: 0, end: 0 }} />;
Vertical0.storyName = 'Vertical - 0%';

export const Vertical0RTL = getStoryVariant(Vertical0, RTL);

export const VerticalMiddle = () => <RangeSlider vertical defaultValue={{ start: 20, end: 80 }} />;
VerticalMiddle.storyName = 'Vertical - Middle';

export const VerticalMiddleRTL = getStoryVariant(VerticalMiddle, RTL);

export const Vertical100 = () => <RangeSlider vertical defaultValue={{ start: 100, end: 100 }} />;
Vertical100.storyName = 'Vertical - 100%';

export const Vertical100RTL = getStoryVariant(Vertical100, RTL);

export const SizeMedium = () => <RangeSlider size="medium" defaultValue={{ start: 30, end: 70 }} />;
SizeMedium.storyName = 'Size - medium';

export const SizeSmall = () => <RangeSlider size="small" defaultValue={{ start: 30, end: 70 }} />;
SizeSmall.storyName = 'Size - small';

export const SizeSmallVertical = () => <RangeSlider size="small" vertical defaultValue={{ start: 30, end: 70 }} />;
SizeSmallVertical.storyName = 'Size - small vertical';

export const Step = () => <RangeSlider step={10} min={0} max={100} defaultValue={{ start: 20, end: 80 }} />;
Step.storyName = 'Step';

export const StepVertical = () => (
  <RangeSlider step={10} min={0} max={100} vertical defaultValue={{ start: 20, end: 80 }} />
);
StepVertical.storyName = 'Step - vertical';

export const MinMax = () => <RangeSlider min={10} max={60} defaultValue={{ start: 20, end: 50 }} />;
MinMax.storyName = 'Custom min/max';
