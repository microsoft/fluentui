import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-northstar';

const TooltipExample = () => <Tooltip trigger={<Button content="Click me!" />} content="Hello from tooltip!" />;

export default TooltipExample;
