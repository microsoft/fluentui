import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Size = () => {
  return (
    <>
      <CompoundButton secondaryContent="This is the secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton secondaryContent="This is the secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton secondaryContent="This is the secondary content" size="large">
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
