import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { ChevronRight12Regular } from '@fluentui/react-icons';
import { useTreeItemContext_unstable } from '../contexts/treeItemContext';

export const TreeItemChevron = React.memo(() => {
  const open = useTreeItemContext_unstable(ctx => ctx.open);

  const { dir } = useFluent_unstable();

  const expandIconRotation = open ? 90 : dir !== 'rtl' ? 0 : 180;
  return <ChevronRight12Regular style={expandIconInlineStyles[expandIconRotation]} />;
});
TreeItemChevron.displayName = 'TreeItemChevron';

const expandIconInlineStyles = {
  90: { transform: `rotate(90deg)` },
  0: { transform: `rotate(0deg)` },
  180: { transform: `rotate(180deg)` },
} as const;
