import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { Slider } from '@fluentui/react-slider';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'Slider Converged',
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
} satisfies Meta<typeof Slider>;

export const Root = () => <Slider className="test-class" defaultValue={30} />;

export const RootRTL = getStoryVariant(Root, RTL);

export const RootHighContrast = getStoryVariant(Root, HIGH_CONTRAST);

export const RootDarkMode = getStoryVariant(Root, DARK_MODE);

export const Vertical = () => <Slider className="test-class" vertical defaultValue={30} />;

export const VerticalRTL = getStoryVariant(Vertical, RTL);

export const Disabled = () => <Slider className="test-class" disabled defaultValue={30} />;

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const DisabledVertical = () => <Slider className="test-class" disabled vertical defaultValue={30} />;
