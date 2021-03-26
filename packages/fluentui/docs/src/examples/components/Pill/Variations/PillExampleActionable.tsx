import * as React from 'react';
import { Pill } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const PillActionableExample = () => (
  <Pill
    actionable
    action={{
      content: <CloseIcon />,
      title: 'Close',
    }}
  >
    Outlined Pill
  </Pill>
);

export default PillActionableExample;
