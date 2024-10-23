import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-table';
import { ResizableColumns } from './utils';

export default {
  title: 'Table layout table - resizable columns',
} satisfies Meta<typeof Table>;

export const Default = () => <ResizableColumns noNativeElements={false} />;
Default.storyName = 'default';

export const End = () => <ResizableColumns noNativeElements={false} scrollToEnd />;
End.storyName = 'end';
