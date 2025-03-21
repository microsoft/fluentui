import * as React from 'react';
import type { Meta } from '@storybook/react';
import { ColorPicker, ColorSlider, AlphaSlider } from '@fluentui/react-color-picker';
import { SampleColorPicker } from './utils';
import { Steps } from 'storywright';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'ColorPicker Converged',
  decorators: [story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default').end() })],
} satisfies Meta<typeof ColorPicker>;

export const Default = () => <SampleColorPicker color={{ h: 109, s: 1, v: 0.91 }} />;

export const ColorSliders = () => (
  <>
    <ColorSlider color={{ h: 109, s: 1, v: 0.9 }} />
    <ColorSlider color={{ h: 184, s: 1, v: 0.9 }} vertical />
  </>
);

export const AlphaSliders = () => (
  <>
    <AlphaSlider color={{ h: 12, s: 1, v: 0.9, a: 0.7 }} />
    <AlphaSlider color={{ h: 59, s: 1, v: 1 }} vertical />
    <AlphaSlider color={{ h: 276, s: 1, v: 0.9, a: 0.2 }} transparency />
    <AlphaSlider color={{ h: 332, s: 1, v: 0.9, a: 0.1 }} transparency vertical />
  </>
);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultRTL = getStoryVariant(Default, RTL);

export const Shape = () => (
  <>
    <SampleColorPicker color={{ h: 195, s: 0.85, v: 0.93 }} shape="square" />
    <SampleColorPicker color={{ h: 195, s: 0.85, v: 0.913 }} shape="rounded" />
  </>
);
Shape.storyName = 'shape';
