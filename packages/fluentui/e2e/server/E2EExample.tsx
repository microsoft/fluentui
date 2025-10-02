import * as React from 'react';
import { useParams } from 'react-router-dom';

import browserTestRoutes from './routes';

const E2EExample: React.FC = () => {
  const params = useParams<{ exampleName: string }>();
  const ExampleComponent = browserTestRoutes[params.exampleName];

  if (!ExampleComponent) {
    throw new Error(`No example found for name: ${params.exampleName}`);
  }

  return <ExampleComponent />;
};

export default E2EExample;
