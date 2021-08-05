import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailPauseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v768h-128V648l-896 447-896-447v888h1280v128H0V384zm143 128l881 441 881-441H143zm1649 1536v-768h128v768h-128zm-256 0v-768h128v768h-128z" />
    </svg>
  ),
  displayName: 'MailPauseIcon',
});

export default MailPauseIcon;
