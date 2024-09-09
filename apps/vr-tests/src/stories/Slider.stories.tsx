import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecoratorTall } from '../utilities';
import { Slider } from '@fluentui/react';

export default {
  title: 'Slider',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Slider-line')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const Root = () => (
  <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
    <Slider label="Basic example:" min={1} max={3} step={1} defaultValue={2} showValue />
  </div>
);

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => (
  <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
    <Slider label="Basic example:" min={1} max={3} step={1} defaultValue={2} showValue disabled />
  </div>
);

export const Vertical = () => (
  <div style={{ flexDirection: 'row', height: '200px', display: 'flex' }}>
    <Slider label="Basic example:" min={1} max={3} step={1} defaultValue={2} showValue vertical />
  </div>
);

export const EqualMinMax = () => (
  <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
    <Slider label="Basic example:" min={1} max={1} step={1} defaultValue={1} showValue />
  </div>
);

EqualMinMax.storyName = 'EqualMinMax';

export const MaxNotMultipleOfStep = () => (
  <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
    <Slider label="Basic example:" min={18} max={48} step={10} defaultValue={48} showValue />
  </div>
);

MaxNotMultipleOfStep.storyName = 'Max not multiple of step';

export const StepLessThan1 = () => (
  <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
    <Slider label="Basic example:" min={1} max={3} step={0.1} defaultValue={1.4} showValue />
  </div>
);

StepLessThan1.storyName = 'Step less than 1';
