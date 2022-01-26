import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ActivateOrdersIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1453l-557 558-269-270 90-90 179 178 467-466 90 90zM1024 640H640V512h384v128zm0 256H640V768h384v128zm-384 128h384v128H640v-128zM512 640H384V512h128v128zm0 256H384V768h128v128zm-128 128h128v128H384v-128zm768-384V128H256v1792h896v128H128V0h1115l549 549v731l-128 128V640h-512zm128-128h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'ActivateOrdersIcon',
});

export default ActivateOrdersIcon;
