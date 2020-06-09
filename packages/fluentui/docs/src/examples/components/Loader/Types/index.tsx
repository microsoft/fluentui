import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const LoaderTypesExamples = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Loader"
      description="A basic loader."
      examplePath="components/Loader/Types/LoaderExample"
    />
    <ComponentExample
      title="Label"
      description="A loader can contain a label."
      examplePath="components/Loader/Types/LoaderExampleLabel"
    />
  </ExampleSection>
);

export default LoaderTypesExamples;
