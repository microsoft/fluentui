import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const RefTypesExamples = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Ref"
      description={
        <span>
          A component exposes the <code>innerRef</code> prop that always returns the DOM node of both functional and
          class component children.
        </span>
      }
      examplePath="components/Ref/Types/RefExample"
    />
    <ComponentExample
      title="Forward Ref"
      description={
        <span>
          Works with <code>forwardRef</code> API.
        </span>
      }
      examplePath="components/Ref/Types/RefForwardingExample"
    />
  </ExampleSection>
);

export default RefTypesExamples;
