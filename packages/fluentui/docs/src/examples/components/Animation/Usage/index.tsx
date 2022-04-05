import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Visible/Not visible"
      description="An Animation can use the visible prop with combination of mountOnEnter or mountOnExit for adding/removing the element from the DOM."
      examplePath="components/Animation/Usage/AnimationExampleVisible"
    />
  </ExampleSection>
);

export default Types;
