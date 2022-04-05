import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import { MenuButton } from './MenuButton';

const MenuList: React.FC = () => (
  <PrototypeSection title="Menu Button">
    <ComponentPrototype title="Reusable submenu" description="">
      <MenuButton />
    </ComponentPrototype>
  </PrototypeSection>
);

export default MenuList;
