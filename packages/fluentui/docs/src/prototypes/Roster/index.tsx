import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import { Roster } from './Roster';

export default () => (
  <PrototypeSection title="Calling Roster">
    <ComponentPrototype title="Calling Roster" description="Calling Roster is a calling roster.">
      <Roster />
    </ComponentPrototype>
  </PrototypeSection>
);
