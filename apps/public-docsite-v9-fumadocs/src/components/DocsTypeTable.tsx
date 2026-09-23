'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { clsx } from 'clsx';

export const DocsTypeTable: ForwardRefComponent<React.ComponentProps<typeof TypeTable>> = React.forwardRef(
  (props, ref) => (
    <TypeTable
      {...props}
      ref={ref}
      className={clsx('bg-surface [&>div[data-state=open]]:bg-surface', props.className)}
    />
  ),
);

DocsTypeTable.displayName = 'DocsTypeTable';
