import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom panel title"
      description="Accordion panel's title can be customized."
      examplePath="components/Accordion/Usage/AccordionPanelCustomTitleExample"
    />
    <ComponentExample
      title="Custom panel content"
      description="Accordion panel's content can be customized."
      examplePath="components/Accordion/Usage/AccordionPanelCustomContentExample"
    />
  </ExampleSection>
);

export default Usage;
