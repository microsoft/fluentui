import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const WithLongText = () => (
  <>
    <CompoundButton secondaryContent="Secondary content">Short text</CompoundButton>
    <CompoundButton secondaryContent="Secondary content">
      Long text truncates after it hits the max width of the component
    </CompoundButton>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width of the component.',
    },
  },
};
