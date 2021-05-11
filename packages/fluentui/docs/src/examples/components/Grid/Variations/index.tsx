import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Columns"
      description="We can specify a certain amount of columns or the explicit columns for a grid."
      examplePath="components/Grid/Variations/GridExampleColumns"
    />
    <ComponentExample
      title="Rows"
      description="We can specify a certain amount of rows or the explicit rows for a grid."
      examplePath="components/Grid/Variations/GridExampleRows"
    />
    <ComponentExample
      title="Columns and Rows"
      description="We can specify a certain amount of columns and rows or the explicit columns and rows for a grid."
      examplePath="components/Grid/Variations/GridExampleColumnsAndRows"
    />
    <ComponentExample
      title="Navigable with keyboard arrow buttons"
      description="Choose between Grid's accessibility behaviors to provide needed keyboard navigation. Add 'data-is-focusable=true' attribute to grid items which aren't natively focusable but should be keyboard navigable."
      examplePath="components/Grid/Variations/GridExampleKeyboardNavigable"
    />
  </ExampleSection>
);

export default Variations;
