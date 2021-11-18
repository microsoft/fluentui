import * as React from 'react';
import { Slider } from '../../index';
import type { Meta } from '@storybook/react';

export * from './stories/SliderDefault.stories';
export * from './stories/SliderControlled.stories';
export * from './stories/SliderStep.stories';
export * from './stories/SliderOrigin.stories';
export * from './stories/SliderDisabled.stories';

export default {
  title: 'Components/Slider',
  component: Slider,
  decorators: [
    Story => (
      <div style={{ display: 'flex', gap: '1em', flexFlow: 'wrap', justifyContent: 'space-evenly', padding: 60 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
