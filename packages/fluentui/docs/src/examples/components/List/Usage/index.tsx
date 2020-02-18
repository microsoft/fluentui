import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title={
        <>
          List with <code>React.memo()</code>
        </>
      }
      description="React.memo() can be used to avoid rerenders."
      examplePath="components/List/Usage/ListExampleMemo"
    />
  </ExampleSection>
);

export default Usage;
