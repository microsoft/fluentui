import * as React from 'react';

import { Spinner } from '@fluentui/react-components';

import { Scenario } from './utils';

export const PostsLoadingSpinnerAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Posts loading spinner">
      <Spinner label="Loading posts..." />
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Posts loading spinner',
  id: 'spinner-accessibility-scenario',
};
