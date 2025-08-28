import { Spinner } from '@fluentui/react-components';
import * as React from 'react';

const IconGrid = React.lazy(() => import('./ReactIconGrid'));

const ReactIconGridLazy: React.FunctionComponent = () => (
  <React.Suspense fallback={<Spinner label="Loading..." />}>
    <IconGrid />
  </React.Suspense>
);

export default ReactIconGridLazy;
