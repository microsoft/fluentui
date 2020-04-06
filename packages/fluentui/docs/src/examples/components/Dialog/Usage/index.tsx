import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const DialogUsageExamples = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Callbacks"
      description="A dialog has different callbacks."
      examplePath="components/Dialog/Usage/DialogExampleCallbacks"
    />
  </ExampleSection>
);

export default DialogUsageExamples;
