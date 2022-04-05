import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnsubscribeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1276q1 2 1 28t1 69 0 97 0 112-1 114 0 102-1 79 0 43H0v-644L373 158l102 99-341 1023h418l128 256h560l128-256h418L1445 256l101-103 374 1123zm-128 132h-344l-128 256H600l-128-256H128v384h1664v-384zM531 787l338-339-338-339 90-90 339 339 339-339 90 90-339 339 339 339-90 90-339-339-339 339-90-90z" />
    </svg>
  ),
  displayName: 'UnsubscribeIcon',
});

export default UnsubscribeIcon;
