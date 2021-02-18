import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import TextAreaAutoResize from './TextAreaAutoResize';

export default () => (
  <PrototypeSection title="Text Area">
    <ComponentPrototype
      title="TextArea Autosize"
      description={
        <div>
          We are using{' '}
          <code>
            <a href="https://github.com/Andarist/react-textarea-autosize">react-textarea-autosize</a>
          </code>{' '}
          to allow auto size, they handle several edge cases with great support. Please check{' '}
          <a href="https://github.com/Andarist/react-textarea-autosize">their docs</a> for more info
        </div>
      }
    >
      <TextAreaAutoResize />
    </ComponentPrototype>
  </PrototypeSection>
);
