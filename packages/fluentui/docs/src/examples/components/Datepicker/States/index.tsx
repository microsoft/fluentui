import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="The datepicker can be disabled."
      examplePath="components/Datepicker/States/DatepickerExampleDisabled"
    />
    <ComponentExample
      title="Required"
      description="The user needs to fill out the date."
      examplePath="components/Datepicker/States/DatepickerExampleRequired"
    />
  </ExampleSection>
);

export default States;
