import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Info"
      description="An alert may be formatted to display information."
      examplePath="components/Alert/Variations/AlertExampleInfo"
    />
    <ComponentExample
      title="OOF"
      description="An alert may be formatted to display an oof message."
      examplePath="components/Alert/Variations/AlertExampleOofs"
    />
    <ComponentExample
      title="Urgent"
      description="An alert may be formatted to display an urgent message."
      examplePath="components/Alert/Variations/AlertExampleUrgent"
    />
    <ComponentExample
      title="Danger"
      description="An alert may be formatted to display a danger or error message."
      examplePath="components/Alert/Variations/AlertExampleDanger"
    />
    <ComponentExample
      title="Warning"
      description="An alert may be formatted to display a warning message."
      examplePath="components/Alert/Variations/AlertExampleWarning"
    />
    <ComponentExample
      title="Success"
      description="An alert may be formatted to display a successful message."
      examplePath="components/Alert/Variations/AlertExampleSuccess"
    />
    <ComponentExample
      title="Attached"
      description="An Alert can be can be formatted to attach itself to other content."
      examplePath="components/Alert/Variations/AlertExampleAttached"
    />
    <ComponentExample
      title="Fitted"
      description="An alert can only take up the width of its content."
      examplePath="components/Alert/Variations/AlertExampleFitted"
    />
  </ExampleSection>
);

export default Variations;
