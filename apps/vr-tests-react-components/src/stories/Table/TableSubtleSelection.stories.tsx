import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table, tableHeaderClassNames } from '@fluentui/react-table';
import { Steps } from 'storywright';
import { withStoryWrightSteps } from '../../utilities';
import { SubtleSelection, SubtleSelectionEmpty } from './utils';

export default {
  title: 'Table table - subtle selection',
  decorators: [
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .hover('.not-selected')
          .snapshot('hover unselected row')
          .hover(`.${tableHeaderClassNames.root}`)
          .snapshot('hover header row')
          .end(),
      }),
  ],
} satisfies Meta<typeof Table>;

export const Rest = () => <SubtleSelection noNativeElements={false} />;
Rest.storyName = 'rest';

export const NoSelection = () => <SubtleSelectionEmpty noNativeElements={false} />;
