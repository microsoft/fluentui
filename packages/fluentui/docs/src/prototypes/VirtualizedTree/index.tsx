import * as React from 'react';
import VirtualizedTree from './VirtualizedTree';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="VirtualizedTree">
    <ComponentPrototype title="Virtualized Tree" description="Tree with its content virtualized.">
      <VirtualizedTree />
    </ComponentPrototype>
  </PrototypeSection>
);
