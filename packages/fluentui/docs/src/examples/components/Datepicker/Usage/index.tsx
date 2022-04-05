import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="No Input Placeholder"
      description="User can decide to not display the guiding placeholder in the input field."
      examplePath="components/Datepicker/Usage/DatepickerNoInputPlaceholderExample"
    />
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
          <code>parseDate</code> prop can be used for custom parsing date string from the input field. The custom
          parsing drops all x in the iputted string.
        </>
      }
      examplePath="components/Datepicker/Usage/DatepickerParseExample"
    />
    <ComponentExample
      title="First day of week"
      description={
        <>
          <code>firstDayOfWeek</code> prop can be used to specify first day of the week. Sunday is default.
        </>
      }
      examplePath="components/Datepicker/Usage/DatepickerFirstWeekDayExample"
    />
  </ExampleSection>
);

export default Usage;
