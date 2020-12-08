import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import { MenuButton } from './MenuButton';

export default () => (
  <PrototypeSection title="Menu Button">
    <ComponentPrototype title="Reusable submenu" description="">
      <MenuButton />
    </ComponentPrototype>
  </PrototypeSection>
);
