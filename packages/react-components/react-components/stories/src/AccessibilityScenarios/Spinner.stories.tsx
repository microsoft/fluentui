import * as React from 'react';

import { Spinner } from '@fluentui/react-components';

import { Scenario } from './utils';

export const PostsLoadingSpinner: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Posts loading spinner">
      <Spinner label="Loading posts..." />
    </Scenario>
  );
};
