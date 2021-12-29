import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

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
