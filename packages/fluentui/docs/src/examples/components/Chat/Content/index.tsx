import * as React from 'react'

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Actions"
      description="A chat message can contain actions."
      examplePath="components/Chat/Content/ChatExampleActions"
    />
    <ComponentExample
      title="Reaction group"
      description="A chat message can contain group of reactions."
      examplePath="components/Chat/Content/ChatExampleReactionGroup"
    />
  </ExampleSection>
)

export default Content
