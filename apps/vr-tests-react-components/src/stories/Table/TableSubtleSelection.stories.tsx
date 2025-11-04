import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table, tableHeaderClassNames } from '@fluentui/react-table';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { SubtleSelection, SubtleSelectionEmpty } from './utils';

export default {
  title: 'Table table - subtle selection',
  parameters: {
    storyWright: {
      steps: new Steps()
        .hover('.not-selected')
        .snapshot('hover unselected row')
        .hover(`.${tableHeaderClassNames.root}`)
        .snapshot('hover header row')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Table>;

export const Rest = () => <SubtleSelection noNativeElements={false} />;
Rest.storyName = 'rest';

export const NoSelection = () => <SubtleSelectionEmpty noNativeElements={false} />;
