import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M259 733l90-90 701 701-701 701-90-90 611-611-611-611zM1789 93l-611 611 611 611-90 90-701-701L1699 3l90 90z" />
    </svg>
  ),
  displayName: 'RemoteIcon',
});

export default RemoteIcon;
