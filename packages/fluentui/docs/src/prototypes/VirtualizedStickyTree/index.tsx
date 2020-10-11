import * as React from 'react';
import VirtualizedStickyTree from './VirtualizedStickyTree';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="Virtualized StickyTree">
    <ComponentPrototype
      title="Virtualized Tree with sticky header"
      description="Tree with its content virtualized, and 1st level header sticky"
    >
      <VirtualizedStickyTree />
    </ComponentPrototype>
    <ComponentPrototype
      title="Virtualized Tree with sticky header"
      description="Tree with its content virtualized, and 1st level header sticky"
    >
      <VirtualizedStickyTree />
    </ComponentPrototype>
  </PrototypeSection>
);
