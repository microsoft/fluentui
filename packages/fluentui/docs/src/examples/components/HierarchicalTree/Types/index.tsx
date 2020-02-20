import * as React from 'react'
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Tree."
      examplePath="components/HierarchicalTree/Types/HierarchicalTreeExample"
    />
    <ComponentExample
      title="Custom Title"
      description="A Tree with customized title rendering."
      examplePath="components/HierarchicalTree/Types/HierarchicalTreeTitleCustomizationExample"
    />
    <ComponentExample
      title="Exclusive"
      description="A Tree with only one subtree open at a time."
      examplePath="components/HierarchicalTree/Types/HierarchicalTreeExclusiveExample"
    />
  </ExampleSection>
)

export default Types
