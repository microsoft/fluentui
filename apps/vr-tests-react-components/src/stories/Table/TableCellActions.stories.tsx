import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { Steps } from 'storywright';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../../utilities';
import type { StoryParameters } from 'storywright';
import { CellActionsAlwaysVisible, CellActionsDefault, CellActionsInHeaderCell } from './utils';

export default {
  title: 'Table layout table - cell actions',
  decorators: [],
  parameters: {
    storyWright: { steps: new Steps().hover('.row-1').snapshot('hover row').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Table>;

export const Default = () => <CellActionsDefault noNativeElements={false} />;
Default.storyName = 'default';

export const Neutral = () => <CellActionsDefault selectedRowAppearance="neutral" noNativeElements={false} />;

export const Brand = () => <CellActionsDefault selectedRowAppearance="brand" noNativeElements={false} />;

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const AlwaysVisible = () => <CellActionsAlwaysVisible noNativeElements={false} />;
AlwaysVisible.storyName = 'always visible';

export const AlwaysVisibleRTL = getStoryVariant(AlwaysVisible, RTL);

export const AlwaysVisibleHighContrast = getStoryVariant(AlwaysVisible, HIGH_CONTRAST);

export const AlwaysVisibleDarkMode = getStoryVariant(AlwaysVisible, DARK_MODE);

export const InHeaderCell = () => <CellActionsInHeaderCell noNativeElements={false} />;
InHeaderCell.storyName = 'in header cell';
