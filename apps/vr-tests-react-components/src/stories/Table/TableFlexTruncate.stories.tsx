import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { Truncate } from './utils';

export default {
  title: 'Table layout flex - truncate',
} satisfies Meta<typeof Table>;

export const Default = () => <Truncate noNativeElements={true} />;
Default.storyName = 'default (disabled)';

export const True = () => <Truncate noNativeElements={true} truncate={true} />;
True.storyName = 'true';

export const False = () => <Truncate noNativeElements={true} truncate={false} />;
False.storyName = 'false';
