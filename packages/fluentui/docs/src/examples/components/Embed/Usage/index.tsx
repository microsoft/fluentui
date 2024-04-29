import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="YouTube"
      description="An embed component can embed a YouTube video by iframe."
      examplePath="components/Embed/Usage/EmbedExampleYouTube"
    />
  </ExampleSection>
);

export default Usage;
