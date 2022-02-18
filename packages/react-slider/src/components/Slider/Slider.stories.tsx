import * as React from 'react';
import { Slider } from '../../index';
import type { Meta } from '@storybook/react';

import descriptionMd from './SliderDescription.md';
export * from './stories/SliderDefault.stories';
export * from './stories/SliderInline.stories';
export * from './stories/SliderSize.stories';
export * from './stories/SliderControlled.stories';
export * from './stories/SliderStep.stories';
export * from './stories/SliderOrigin.stories';
export * from './stories/SliderVertical.stories';
export * from './stories/SliderDisabled.stories';

export default {
  title: 'Preview Components/Slider',
  component: Slider,
  parameters: {
    docs: {
      // The provided typing is wrong, ignore it
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          maxWidth: 400,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
