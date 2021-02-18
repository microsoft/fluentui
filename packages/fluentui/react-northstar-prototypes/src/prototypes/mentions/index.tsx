import * as React from 'react';

import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import MentionsEditor from './MentionsEditor';
import MentionsDropdown from './MentionsDropdown';

export default () => (
  <PrototypeSection title="Mentions">
    <ComponentPrototype
      title="Editable Area with Dropdown"
      description="Type text into editable area below. Use the '@' key to mention people."
    >
      <MentionsEditor children={props => <MentionsDropdown {...props} />} />
    </ComponentPrototype>
  </PrototypeSection>
);
