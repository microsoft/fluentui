import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Accordion."
      examplePath="components/Accordion/Types/AccordionExample"
    />
    <ComponentExample
      title="Exclusive"
      description="An exclusive Accordion."
      examplePath="components/Accordion/Types/AccordionExclusiveExample"
    />
    <ComponentExample
      title="Exclusive and Expanded"
      description="An exclusive expanded Accordion."
      examplePath="components/Accordion/Types/AccordionExclusiveExpandedExample"
    />
  </ExampleSection>
);

export default Types;
