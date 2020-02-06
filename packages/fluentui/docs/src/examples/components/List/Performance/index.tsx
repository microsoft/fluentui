import * as React from 'react'

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Common"
      description="A typical list with common slots filled."
      examplePath="components/List/Performance/ListCommon.perf"
    />
  </ExampleSection>
)

export default Performance
