import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample title="Label" description="A label." examplePath="components/Label/Content/LabelExample" />
    <ComponentExample
      title="Image"
      description="A label can contain image."
      examplePath="components/Label/Content/LabelExampleImage"
    />
    <ComponentExample
      title="Image position"
      description="The image in the Label can be positioned to appear in the ending of the Label."
      examplePath="components/Label/Content/LabelExampleImagePosition"
    />
    <ComponentExample
      title="Icon"
      description="A label can contain icon."
      examplePath="components/Label/Content/LabelExampleIcon"
    />
    <ComponentExample
      title="Icon position"
      description="The icon in the Label can be positioned to appear in the starting of the Label."
      examplePath="components/Label/Content/LabelExampleIconPosition"
    />
    <ComponentExample
      title="Content customization"
      description="The content props in the label can be customized."
      examplePath="components/Label/Content/LabelExampleContentCustomization"
    />
  </ExampleSection>
);

export default Content;
