import * as React from 'react';

import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Status } from '@fluentui/react-northstar';

const StatusSizeExampleShorthand = () => (
  <div>
    <Status size="smallest" state="success" icon={<AcceptIcon />} title="available" />
    &emsp;
    <Status size="smaller" state="success" icon={<AcceptIcon />} title="available" />
    &emsp;
    <Status size="small" state="success" icon={<AcceptIcon />} title="available" />
    &emsp;
    <Status size="medium" state="success" icon={<AcceptIcon />} title="available" />
    &emsp;
    <Status size="large" state="success" icon={<AcceptIcon />} title="available" />
    &emsp;
    <Status size="larger" state="success" icon={<AcceptIcon />} title="available" />
  </div>
);

export default StatusSizeExampleShorthand;
