import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReleaseGateCheckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M749 403l557 557-557 557-90-90 402-403H0V896h1061L659 493l90-90zm787 1136V128h-384V0h512v1411l-128 128zm403-176l90 90-557 558-269-270 90-90 179 178 467-466z" />
    </svg>
  ),
  displayName: 'ReleaseGateCheckIcon',
});

export default ReleaseGateCheckIcon;
