import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReleaseGateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M749 403l557 557-557 557-90-90 402-403H0V896h1061L659 493l90-90zM1152 0h512v1920h-512v-128h384V128h-384V0z" />
    </svg>
  ),
  displayName: 'ReleaseGateIcon',
});

export default ReleaseGateIcon;
