import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { Steps } from 'storywright';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST } from '../../utilities';
import type { StoryParameters } from 'storywright';
import { SortableHeaders } from './utils';

export default {
  title: 'Table layout flex - headers',
  parameters: {
    storyWright: {
      steps: new Steps()
        .hover('.columnheader')
        .snapshot('hover header')
        .mouseDown('.columnheader')
        .snapshot('press header')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Table>;

export const Sortable = () => <SortableHeaders noNativeElements={true} />;
Sortable.storyName = 'sortable';

export const SortableDarkMode = getStoryVariant(Sortable, DARK_MODE);

export const SortableHighContrast = getStoryVariant(Sortable, HIGH_CONTRAST);
