import * as React from 'react';
import { Steps } from 'storywright';
import {
  ColorPicker,
  ColorArea,
  AlphaSlider,
  ColorSlider,
  type ColorPickerProps,
} from '@fluentui/react-color-picker-preview';

export const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('.breadcrumb-sample')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('.breadcrumb-sample')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .focus('.breadcrumb-sample')
  .snapshot('focused', { cropTo: '.testWrapper' })
  .end();

export const SampleColorPicker = (props: ColorPickerProps) => (
  <ColorPicker {...props}>
    <ColorArea />
    <ColorSlider />
    <AlphaSlider />
  </ColorPicker>
);
