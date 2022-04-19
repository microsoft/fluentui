import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const Size = () => {
  return (
    <>
      <CompoundButton secondaryContent="Secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" size="large">
        Size: large
      </CompoundButton>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A compound button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
