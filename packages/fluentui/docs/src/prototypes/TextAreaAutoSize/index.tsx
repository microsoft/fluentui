import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import TextAreaAutoResize from './TextAreaAutoResize';

export default () => (
  <PrototypeSection title="Text Area">
    <ComponentPrototype title="TextArea Autosize" description="Using text area with auto size">
      <TextAreaAutoResize />
    </ComponentPrototype>
  </PrototypeSection>
);
