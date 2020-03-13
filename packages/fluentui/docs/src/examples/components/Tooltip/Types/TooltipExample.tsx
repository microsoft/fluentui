import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-experimental';

const TooltipExample = () => (
  <Tooltip content="Hello from tooltip!">
    <Button>Click me!</Button>
  </Tooltip>
);

export default TooltipExample;
