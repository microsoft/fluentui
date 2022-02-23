import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton';

export const WithLongText = () => (
  <>
    <ToggleButton>Short text</ToggleButton>
    <ToggleButton>Long text truncates after it hits the max width of the component</ToggleButton>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme of the component.',
    },
  },
};
