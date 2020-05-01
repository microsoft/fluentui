import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Attachment."
      examplePath="components/Attachment/Types/AttachmentExample"
    />
    <ComponentExample
      title="Progress"
      description="An attachment can show upload progress."
      examplePath="components/Attachment/Types/AttachmentProgressExample"
    />
  </ExampleSection>
);

export default Types;
