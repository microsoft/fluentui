'use client';

import * as React from 'react';
import type { ExtractSlotProps, ForwardRefComponent } from '@fluentui/react-utilities';

import { Checkbox } from '../Checkbox';
import type { ListItemSlots } from './ListItem.types';

import styles from './ListItem.module.css';

// Native props and the ref belong to the input: ListItem uses that ref to suppress a second
// selection action when an input click bubbles to the row.
export const ListItemCheckmark: ForwardRefComponent<ExtractSlotProps<ListItemSlots['checkmark']>> = React.forwardRef(
  ({ checked, defaultChecked, disabled, ...input }, ref) => (
    <Checkbox
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      input={input}
      root={{ className: styles.checkmark }}
    />
  ),
);

ListItemCheckmark.displayName = 'ListItemCheckmark';
