import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { VisualRefreshExamples } from './StorybookUtil';

export const CAPInputStory = () => {
  return (
    <VisualRefreshExamples
      examples={[
        {
          title: 'Default',
          render() {
            return <Input placeholder="Placeholder text" />;
          },
        },
      ]}
    />
  );
};
