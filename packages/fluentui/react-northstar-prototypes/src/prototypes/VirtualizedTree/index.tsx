import * as React from 'react';
import VirtualTreePrototype from './VirtualTreePrototype';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="VirtualizedTree">
    <ComponentPrototype title="Virtualized Tree" description="Tree with its content virtualized.">
      <VirtualTreePrototype />
    </ComponentPrototype>
  </PrototypeSection>
);
