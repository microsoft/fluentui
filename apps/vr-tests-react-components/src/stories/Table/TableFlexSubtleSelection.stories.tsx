import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { SubtleSelection } from './utils';

export default {
  title: 'Table flex - subtle selection',
  parameters: {
    storyWright: { steps: new Steps().hover('.not-selected').snapshot('hover unselected row').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Table>;

export const Rest = () => <SubtleSelection noNativeElements={true} />;
Rest.storyName = 'rest';
