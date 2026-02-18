import * as React from 'react';

import type { Meta } from '@storybook/react';

import { RangeSlider } from '@fluentui/react-components';

import descriptionMd from './RangeSliderDescription.md';
import bestPracticesMd from './RangeSliderBestPractices.md';

export { Default } from './RangeSliderDefault.stories';
export { Size } from './RangeSliderSize.stories';
export { Controlled } from './RangeSliderControlled.stories';
export { Step } from './RangeSliderStep.stories';
export { MinMax } from './RangeSliderMinMax.stories';
export { Vertical } from './RangeSliderVertical.stories';
export { Disabled } from './RangeSliderDisabled.stories';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
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
} as Meta<typeof RangeSlider>;
