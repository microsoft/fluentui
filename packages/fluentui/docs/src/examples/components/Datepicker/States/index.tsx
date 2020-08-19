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
    <ComponentExample
      title="Today's date"
      description="The user can fill out the today's date."
      examplePath="components/Datepicker/States/DatepickerExampleToday"
    />
    <ComponentExample
      title="Clearable Input"
      description="The user can clear selected date by clicking on the cancel button."
      examplePath="components/Datepicker/States/DatepickerExampleClearable"
    />
  </ExampleSection>
);

export default States;
