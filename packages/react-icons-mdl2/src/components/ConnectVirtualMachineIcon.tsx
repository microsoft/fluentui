import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ConnectVirtualMachineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1280h-768v128h128v128h256v128h384v128h-384v128H512v-128H128v-128h384v-128h256v-128h128v-128H128V128h1664v1152zm-512 384h-256v-128H896v128H640v128h640v-128zM256 1152h1408V256H256v896z" />
    </svg>
  ),
  displayName: 'ConnectVirtualMachineIcon',
});

export default ConnectVirtualMachineIcon;
