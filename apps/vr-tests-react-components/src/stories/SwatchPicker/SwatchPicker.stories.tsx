import * as React from 'react';
import { SwatchPicker } from '@fluentui/react-swatch-picker';
import { SampleSwatchPickerColors, SampleSwatchPickerImages, SampleSwatchPickerGrid, steps } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'SwatchPicker Converged',
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof SwatchPicker>;

export const Default = () => (
  <>
    <h3>Colors</h3>
    <SampleSwatchPickerColors />
    <h3>Images</h3>
    <SampleSwatchPickerImages />
    <h3>Grid layout</h3>
    <SampleSwatchPickerGrid />
  </>
);

Default.storyName = 'default';

export const AppearanceDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Size = () => (
  <>
    <h3>Colors</h3>
    <SampleSwatchPickerColors size="extra-small" />
    <SampleSwatchPickerColors size="small" />
    <SampleSwatchPickerColors size="medium" />
    <SampleSwatchPickerColors size="large" />
    <h3>Images</h3>
    <SampleSwatchPickerImages size="extra-small" />
    <SampleSwatchPickerImages size="small" />
    <SampleSwatchPickerImages size="medium" />
    <SampleSwatchPickerImages size="large" />
    <h3>Grid layout</h3>
    <SampleSwatchPickerGrid size="extra-small" />
    <SampleSwatchPickerGrid size="small" />
    <SampleSwatchPickerGrid size="medium" />
    <SampleSwatchPickerGrid size="large" />
  </>
);

Size.storyName = 'size';

export const Shape = () => (
  <>
    <h3>Colors</h3>
    <SampleSwatchPickerColors shape="square" />
    <SampleSwatchPickerColors shape="circular" />
    <SampleSwatchPickerColors shape="rounded" />
    <h3>Images</h3>
    <SampleSwatchPickerImages shape="square" />
    <SampleSwatchPickerImages shape="circular" />
    <SampleSwatchPickerImages shape="rounded" />
    <h3>Grid layout</h3>
    <SampleSwatchPickerGrid shape="square" />
    <SampleSwatchPickerGrid shape="circular" />
  </>
);

Size.storyName = 'shape';

export const Spacing = () => (
  <>
    <h3>Colors</h3>
    <SampleSwatchPickerColors spacing="medium" />
    <SampleSwatchPickerColors spacing="small" />
    <h3>Images</h3>
    <SampleSwatchPickerImages spacing="medium" />
    <SampleSwatchPickerImages spacing="small" />
    <h3>Grid layout</h3>
    <SampleSwatchPickerGrid spacing="medium" />
    <SampleSwatchPickerGrid spacing="small" />
  </>
);

Size.storyName = 'spacing';
