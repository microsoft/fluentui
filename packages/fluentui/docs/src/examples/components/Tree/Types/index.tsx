import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample title="TEST" description="TEST." examplePath="components/Tree/Types/TreeExampleTest" />
    <ComponentExample title="Default" description="A default Tree." examplePath="components/Tree/Types/TreeExample" />
    <ComponentExample
      title="Exclusive"
      description="A Tree with only one subtree open at a time."
      examplePath="components/Tree/Types/TreeExclusiveExample"
    />
  </ExampleSection>
);

export default Types;
