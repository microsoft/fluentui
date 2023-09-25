import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const LoaderTypesExamples = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Secondary"
      description="Loaders can be secondary."
      examplePath="components/Loader/Variations/LoaderExampleSecondary"
    />
    <ComponentExample
      title="Inline"
      description="Loaders can appear inline with content."
      examplePath="components/Loader/Variations/LoaderExampleInline"
    />
    <ComponentExample
      title="Label Position"
      description="A label in the loader can have different positions."
      examplePath="components/Loader/Variations/LoaderExampleLabelPosition"
    />
    <ComponentExample
      title="Size"
      description="A size of the loader."
      examplePath="components/Loader/Variations/LoaderExampleSize"
    />
  </ExampleSection>
);

export default LoaderTypesExamples;
