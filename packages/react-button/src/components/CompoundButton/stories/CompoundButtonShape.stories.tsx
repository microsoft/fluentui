import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const Shape = () => (
  <>
    <CompoundButton secondaryContent="This is the secondary content">CompoundButton</CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" shape="circular">
      CompoundButton
    </CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" shape="square">
      CompoundButton
    </CompoundButton>
  </>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'A compound button can be rounded, circular, or square.',
    },
  },
};
