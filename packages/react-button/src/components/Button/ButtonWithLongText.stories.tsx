import * as React from 'react';
import { Button } from '@fluentui/react-button';

export const ButtonWithLongText = () => (
  <>
    <Button>Text</Button>
    <Button>Text truncates after it hits the max width token value</Button>
  </>
);
ButtonWithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
