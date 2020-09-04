import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variants = () => (
  <ExampleSection title="Variants">
    <ComponentExample
      title="Standalone DatepickerCalendar with Button"
      description={
        <>
          One can also use the <code>DatepickerCalendar</code> without <code>Input</code>. The way to achieve this is
          through Datepicker.type prop.
        </>
      }
      examplePath="components/Datepicker/Variants/DatepickerExampleStandaloneCalendarButton"
    />
    <ComponentExample
      title="Standalone DatepickerCalendar with Input"
      description={
        <>
          One can also use the <code>DatepickerCalendar</code> without <code>Button</code>. The way to achieve this is
          through Datepicker.type prop.
        </>
      }
      examplePath="components/Datepicker/Variants/DatepickerExampleStandaloneCalendarInput"
    />
  </ExampleSection>
);

export default Variants;
