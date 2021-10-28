import * as React from 'react';
import { MenuButton } from '../../../MenuButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const WithLongText = () => (
  <>
    <MenuButton>Text</MenuButton>
    <MenuButton>Text truncates after it hits the max width token value</MenuButton>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
