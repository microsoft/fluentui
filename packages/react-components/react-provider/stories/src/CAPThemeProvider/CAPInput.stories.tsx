import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { CAPThemeExamples } from './CAPStorybookUtil';

export const CAPInputStory = () => {
  return (
    <CAPThemeExamples
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
