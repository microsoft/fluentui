import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { RangeSlider } from '@fluentui/react-slider';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'RangeSlider Converged',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.test-class')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.test-class')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.test-class')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof RangeSlider>;

export const Root = () => <RangeSlider className="test-class" defaultValue={{ start: 20, end: 80 }} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const RootHighContrast = getStoryVariant(Root, HIGH_CONTRAST);

export const RootDarkMode = getStoryVariant(Root, DARK_MODE);

export const Vertical = () => <RangeSlider className="test-class" vertical defaultValue={{ start: 20, end: 80 }} />;

export const VerticalRTL = getStoryVariant(Vertical, RTL);

export const Disabled = () => <RangeSlider className="test-class" disabled defaultValue={{ start: 20, end: 60 }} />;

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const DisabledVertical = () => (
  <RangeSlider className="test-class" disabled vertical defaultValue={{ start: 20, end: 60 }} />
);
