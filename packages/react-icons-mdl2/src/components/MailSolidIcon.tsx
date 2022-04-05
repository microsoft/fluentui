import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v85L1024 981 0 469v-85h2048zm-1024 811l1024-512v981H0V683l1024 512z" />
    </svg>
  ),
  displayName: 'MailSolidIcon',
});

export default MailSolidIcon;
