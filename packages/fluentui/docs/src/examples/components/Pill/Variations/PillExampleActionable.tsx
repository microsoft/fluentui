import * as React from 'react';
import { Pill } from '@fluentui/react-northstar';

const PillActionableExample = () => (
  <Pill
    actionable
    onDismiss={(e, data) => {
      // eslint-disable-next-line no-console
      console.log(e, data);
    }}
  >
    Outlined Pill
  </Pill>
);

export default PillActionableExample;
