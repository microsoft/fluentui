import { Button, Dialog, Tooltip } from '@fluentui/react-northstar';
import * as React from 'react';

const TooltipExampleDialogContentShorthand: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    content={<Tooltip trigger={<Button content="Click me!" />} content="Hello from tooltip!" />}
    header="I have a tooltip!"
    trigger={<Button content="Open a dialog" />}
  />
);

export default TooltipExampleDialogContentShorthand;
