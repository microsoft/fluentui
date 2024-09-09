import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { Steps } from 'storywright';
import { withStoryWrightSteps } from '../../utilities';
import { SubtleSelection } from './utils';

export default {
  title: 'Table flex - subtle selection',
  decorators: [
    story =>
      withStoryWrightSteps({ story, steps: new Steps().hover('.not-selected').snapshot('hover unselected row').end() }),
  ],
} satisfies Meta<typeof Table>;

export const Rest = () => <SubtleSelection noNativeElements={true} />;
Rest.storyName = 'rest';
