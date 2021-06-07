import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailForwardMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384H0v1024l128-128V583l896 449 896-449v953H896v128h1152V384zM1024 888L271 512h1506l-753 376zm-611 485l-90-90L6 1600l317 317 90-90-163-163h518v-128H250l163-163z" />
    </svg>
  ),
  displayName: 'MailForwardMirroredIcon',
});

export default MailForwardMirroredIcon;
