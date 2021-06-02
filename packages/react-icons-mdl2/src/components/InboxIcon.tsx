import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InboxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1276q1 3 1 48t1 113v146q0 79-1 149t0 123-1 65H0v-65q0-52-1-122t0-150-1-146v-113q0-45 2-48L383 128h1154l383 1148zm-128 132h-344l-128 256H600l-128-256H128v384h1664v-384zm-6-128L1445 256H475L134 1280h418l128 256h560l128-256h418z" />
    </svg>
  ),
  displayName: 'InboxIcon',
});

export default InboxIcon;
