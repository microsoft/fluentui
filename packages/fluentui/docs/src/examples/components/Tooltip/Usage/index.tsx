import * as React from 'react'

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom Target"
      description="By default Tooltip uses trigger element as the one it is displayed for, but it is possible to provide any DOM element as tooltip's target."
      examplePath="components/Tooltip/Usage/TooltipExampleTarget"
    />
    <ComponentExample
      title="Disabled Trigger"
      description="When the tooltip should appear on a disabled element, it should be added on the wrapper on the element."
      examplePath="components/Tooltip/Usage/TooltipExampleDisabledTrigger"
    />
  </ExampleSection>
)

export default Usage
