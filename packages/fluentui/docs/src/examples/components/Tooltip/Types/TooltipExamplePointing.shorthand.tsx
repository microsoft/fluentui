import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-future';

const TooltipExamplePointing = () => <Tooltip open pointing trigger={<Button icon="more" />} content="The tooltip is pointing." />;

export default TooltipExamplePointing;
