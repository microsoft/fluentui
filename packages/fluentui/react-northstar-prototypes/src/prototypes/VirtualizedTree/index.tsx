import * as React from 'react';
import VirtualTreePaginationPrototype from './VirtualTreePaginationPrototype';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="VirtualizedTree">
    <ComponentPrototype title="Virtualized Tree" description="Tree with its content virtualized.">
      <VirtualTreePaginationPrototype />
    </ComponentPrototype>
  </PrototypeSection>
);
