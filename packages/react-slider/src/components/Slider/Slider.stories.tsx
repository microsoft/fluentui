import * as React from 'react';
import { Slider } from '../../index';
import type { Meta } from '@storybook/react';

import descriptionMd from './SliderDescription.md';
export { Default } from './stories/SliderDefault.stories';
export { Size } from './stories/SliderSize.stories';
export { Controlled } from './stories/SliderControlled.stories';
export { Step } from './stories/SliderStep.stories';
export { Origin } from './stories/SliderOrigin.stories';
export { Vertical } from './stories/SliderVertical.stories';
export { Disabled } from './stories/SliderDisabled.stories';

export default {
  title: 'Components/Slider',
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
          // These stories use grid layout due to Safari bug noted in PR https://github.com/microsoft/fluentui/pull/21479
          display: 'grid',
          gridTemplateRows: 'repeat(1fr)',
          justifyItems: 'start',
          padding: 20,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
