import * as React from 'react';
import { VirtualizedTreePrototype } from '@fluentui/react-northstar-prototypes';

const treeVirtualizedKeyboardNavigation = () => (
  <React.Suspense fallback={<div />}>
    <VirtualizedTreePrototype />
  </React.Suspense>
);
export default treeVirtualizedKeyboardNavigation;
