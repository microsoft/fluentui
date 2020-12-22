import * as React from 'react';
import VirtualStickyTreePrototype from './VirtualStickyTreePrototype';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="VirtualizedStickyTree">
    <ComponentPrototype
      title="Virtualized Sticky Tree"
      description="Tree with sticky headers and its content virtualized."
    >
      <VirtualStickyTreePrototype />
    </ComponentPrototype>
  </PrototypeSection>
);
