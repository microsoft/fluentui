import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DisconnectVirtualMachineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1277 1501l-227 227 227 227-90 90-227-227-227 227-90-90 227-227-227-227 90-90 227 227 227-227 90 90zm-669 163l64 64-64 64H128v-128h480zm640 64l64-64h480v128h-480l-64-64zM128 128h1664v1152h-768v96l-64 64-64-64v-96H128V128zm1536 1024V256H256v896h1408z" />
    </svg>
  ),
  displayName: 'DisconnectVirtualMachineIcon',
});

export default DisconnectVirtualMachineIcon;
