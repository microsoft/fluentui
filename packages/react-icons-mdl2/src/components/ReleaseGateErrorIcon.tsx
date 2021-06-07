import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReleaseGateErrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M749 403l557 557-557 557-90-90 402-403H0V896h1061L659 493l90-90zm787 621V128h-384V0h512v1024h-128zm512 576q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35q93 0 174 35t143 96 96 142 35 175zm-448 320q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25zm104-504l80 80-105 104 105 104-80 80-104-105-104 105-80-80 105-104-105-104 80-80 104 105 104-105z" />
    </svg>
  ),
  displayName: 'ReleaseGateErrorIcon',
});

export default ReleaseGateErrorIcon;
