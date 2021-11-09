import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

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
