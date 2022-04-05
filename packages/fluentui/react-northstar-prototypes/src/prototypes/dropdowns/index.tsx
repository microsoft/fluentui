import * as React from 'react';

import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import AsyncDropdownSearch from './AsyncDropdownSearch';

export default () => (
  <PrototypeSection title="Dropdowns">
    <ComponentPrototype title="Async Dropdown Search" description="Use the field to perform a simulated search.">
      <AsyncDropdownSearch />
    </ComponentPrototype>
  </PrototypeSection>
);
