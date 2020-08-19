import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom formatting"
      description={
        <>
          <code>formatMonthDayYear</code> prop can be used for custom date formatting in the input field
        </>
      }
      examplePath="components/Datepicker/Usage/DatepickerFormatExample"
    />
    <ComponentExample
      title="Custom parsing"
      description={
        <>
          <code>parseDate</code> prop can be used for custom parsing date string from the input field
        </>
      }
      examplePath="components/Datepicker/Usage/DatepickerParseExample"
    />
    <ComponentExample
      title="Standalone DatepickerCalendar"
      description={
        <>
          One can also use the <code>DatepickerCalendar</code> without <code>Input</code>. In that case, the developer
          needs to take care of the
          <code>selectedDate</code> state control.
        </>
      }
      examplePath="components/Datepicker/Usage/DatepickerExampleStandaloneCalendar"
    />
  </ExampleSection>
);

export default Usage;
