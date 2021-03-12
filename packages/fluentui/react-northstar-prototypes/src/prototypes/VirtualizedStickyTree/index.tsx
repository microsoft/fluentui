import * as React from 'react';
// import VirtualStickyTreePrototype from './VirtualStickyTreePrototype';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import VirtualStickyTreePaginationPrototype from './VirtualStickyTreePaginationPrototype';

export default () => (
  <PrototypeSection title="VirtualizedStickyTree">
    {/* <ComponentPrototype
      title="Virtualized Sticky Tree"
      description="Tree with sticky headers and its content virtualized."
    >
      <VirtualStickyTreePrototype />
    </ComponentPrototype> */}
    <ComponentPrototype
      title="Virtualized Sticky Tree with react-window-infinite-loader"
      description="Tree with sticky headers and its content virtualized, and using infinite loader to allow loading items in batches"
    >
      <VirtualStickyTreePaginationPrototype />
    </ComponentPrototype>
  </PrototypeSection>
);
