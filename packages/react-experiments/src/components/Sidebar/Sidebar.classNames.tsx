/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import type { ISidebarStyles } from './Sidebar.types';

export interface ISidebarClassNames {
  root?: string;
  rootCollapsed?: string;
  content?: string;
  contentCollapsed?: string;
  footer?: string;
}

export const getSidebarClassNames = memoizeFunction(
  (styles: ISidebarStyles, className?: string, collapsed?: boolean): ISidebarClassNames => {
    return mergeStyleSets({
      root: [`ba-Sidebar`, styles.root, className, collapsed && ['collapsed', styles.rootCollapsed]],
      content: [`ba-SidebarContent`, styles.content, collapsed && ['collapsed', styles.contentCollapsed]],
      footer: [`ba-SidebarFooter`, styles.footer],
    });
  },
);
