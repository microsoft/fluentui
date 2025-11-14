import * as React from 'react';
import { Badge } from '@fluentui/react-components';
import { VisualRefreshExamples } from './StorybookUtil';

export const CAPBadgeStory = () => {
  return (
    <VisualRefreshExamples
      examples={[
        {
          title: 'Default',
          render() {
            return <Badge />;
          },
        },
      ]}
    />
  );
};
