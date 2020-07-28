import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Slider with label in a form"
      description="Shows how a slider can be used together with a label to display information in the context of a form."
      examplePath="components/Slider/Usage/SliderExampleForm"
    />
    <ComponentExample
      title="Slider with action element and input"
      description={
        <div>
          <span>This example contains:</span>
          <ul>
            <li>
              a <code>Slider</code> that allows the user to choose a value from within a specific range of values.
            </li>
            <li>
              a <code>Button</code> that changes its icon and toggles the <code>Slider</code> value when clicked
              (between current value and minimum value).
            </li>
            <li>
              an <code>Input</code> that changes and displays the current <code>Slider</code> value.
            </li>
          </ul>
        </div>
      }
      examplePath="components/Slider/Usage/SliderExampleAction"
    />
  </ExampleSection>
);

export default Usage;
