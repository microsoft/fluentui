import * as React from 'react';
import { Layout } from '@fluentui/react-northstar';

const LayoutExampleReducing = () => (
  <div>
    <Layout debug reducing main="Given single a piece of content, no area containers are rendered." />
    <br />
    <Layout debug reducing end="End content." main="Areas are retained when there are multiple pieces of content." />
  </div>
);

export default LayoutExampleReducing;
