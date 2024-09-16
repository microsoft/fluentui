import * as React from 'react';

import { SidebarBasicExample } from './Sidebar.Basic.Example';
import { SidebarCollapsibleExample } from './Sidebar.Collapsed.Example';

export const Basic = () => <SidebarBasicExample />;

export const Collapsible = () => <SidebarCollapsibleExample />;

export default {
  title: 'Components/Sidebar',
};
