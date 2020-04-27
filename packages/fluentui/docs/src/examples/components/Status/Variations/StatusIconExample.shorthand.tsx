import * as React from 'react';
import { Status } from '@fluentui/react-northstar';
import { AcceptIcon, BanIcon } from '@fluentui/react-icons-northstar';

const StatusIconExampleShorthand = () => (
  <div>
    <Status state="success" icon={<AcceptIcon />} title="available" />
    &emsp;
    <Status state="error" icon={<BanIcon />} title="offline" />
  </div>
);

export default StatusIconExampleShorthand;
