import * as React from 'react';
import { Status } from '@fluentui/react-northstar';
import { CallPstnIcon, OneDriveIcon, BanIcon } from '@fluentui/react-icons-northstar';

const StatusCustomExampleShorthand = () => (
  <div>
    <Status color="orange" icon={<CallPstnIcon />} title="In call" />
    &emsp;
    <Status color="blue" icon={<OneDriveIcon />} title="Working from the sky" />
    &emsp;
    <Status color="red" icon={<BanIcon />} title="Offline" />
  </div>
);

export default StatusCustomExampleShorthand;
