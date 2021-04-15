import * as React from 'react';
import ContextMenuTreePrototype from './contextMenuTreePrototype';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

export default () => (
  <PrototypeSection title="ContextMenuTree">
    <ComponentPrototype title="Context Menu Tree" description="Tree with context menu and '...' more options button.">
      <ContextMenuTreePrototype />
    </ComponentPrototype>
  </PrototypeSection>
);
