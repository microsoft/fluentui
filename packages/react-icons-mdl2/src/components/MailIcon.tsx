import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v1280H0V384h2048zM143 512l881 441 881-441H143zm1777 1024V648l-896 447-896-447v888h1792z" />
    </svg>
  ),
  displayName: 'MailIcon',
});

export default MailIcon;
