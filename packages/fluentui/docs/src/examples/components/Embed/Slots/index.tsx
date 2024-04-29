import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Video"
      description="A basic embedded video."
      examplePath="components/Embed/Slots/EmbedExampleVideo"
    />
  </ExampleSection>
);

export default Slots;
