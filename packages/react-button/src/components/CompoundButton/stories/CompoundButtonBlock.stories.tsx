import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const Block = () => (
  <>
    <CompoundButton secondaryContent="Secondary content" block>
      Block
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
