import * as React from 'react';
import { Tooltip } from '@fluentui/react-northstar';
import { Button } from '@fluentui/react-button';

const ButtonExampleWithTooltip = () => (
  <Tooltip trigger={<Button content="Button with tooltip" />} content="This is an actionable element." />
);

export default ButtonExampleWithTooltip;
