import * as React from 'react';
import { Dialog } from '@fluentui/react-northstar';

export const PropSelector: React.FunctionComponent<{ onConfirm: any }> = onConfirm => {
  return (
    <Dialog
      cancelButton="Program firewall"
      confirmButton="Transmit monitor"
      content="Transmit interface"
      header="Synthesize interface"
      headerAction="Navigate driver"
    />
  );
};
