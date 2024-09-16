import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { Truncate } from './utils';

export default {
  title: 'Table layout table - truncate',
} satisfies Meta<typeof Table>;

export const Default = () => <Truncate noNativeElements={false} />;
Default.storyName = 'default (disabled)';

export const True = () => <Truncate noNativeElements={false} truncate={true} />;
True.storyName = 'true';

export const False = () => <Truncate noNativeElements={false} truncate={false} />;
False.storyName = 'false';
