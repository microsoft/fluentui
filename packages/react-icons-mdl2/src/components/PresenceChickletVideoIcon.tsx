import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PresenceChickletVideoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 760l512-256v1040l-512-256v248H0V512h1536v248z" />
    </svg>
  ),
  displayName: 'PresenceChickletVideoIcon',
});

export default PresenceChickletVideoIcon;
