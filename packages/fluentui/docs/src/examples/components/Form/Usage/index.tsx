import * as React from 'react'
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Checkbox"
      description="A form can have a Checkbox as a field."
      examplePath="components/Form/Usage/FormExampleCheckbox"
    />
    <ComponentExample
      title="Dropdown"
      description="A form can have a Dropdown as a field."
      examplePath="components/Form/Usage/FormExampleDropdown"
    />
    <ComponentExample
      title="Slider"
      description="A form can have a Slider as a field."
      examplePath="components/Form/Usage/FormExampleSlider"
    />
  </ExampleSection>
)

export default Usage
