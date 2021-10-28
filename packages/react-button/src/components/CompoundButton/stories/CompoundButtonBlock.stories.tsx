import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Block = () => (
  <>
    <CompoundButton secondaryContent="This is the secondary content" block>
      Block button
    </CompoundButton>
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A compound button can fill the width of its container.',
    },
  },
};
