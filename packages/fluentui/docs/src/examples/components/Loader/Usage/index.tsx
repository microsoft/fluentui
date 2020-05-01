import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const LoaderUsageExamples = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Delay"
      description="Time in milliseconds after component mount before spinner is visible."
      examplePath="components/Loader/Usage/LoaderExampleDelay"
    />
  </ExampleSection>
);

export default LoaderUsageExamples;
