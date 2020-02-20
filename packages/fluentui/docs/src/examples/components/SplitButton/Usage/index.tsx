import * as React from 'react'

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Main option change"
      description="A split button can have its main option changed based on last selection."
      examplePath="components/SplitButton/Usage/SplitButtonMainOptionChangeExample"
    />
  </ExampleSection>
)

export default Usage
