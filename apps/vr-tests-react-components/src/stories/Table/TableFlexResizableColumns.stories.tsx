import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { ResizableColumns } from './utils';

export default {
  title: 'Table layout flex - resizable columns',
} satisfies Meta<typeof Table>;

export const Default = () => <ResizableColumns noNativeElements={true} />;
Default.storyName = 'default';

export const End = () => <ResizableColumns noNativeElements={true} scrollToEnd />;
End.storyName = 'end';
