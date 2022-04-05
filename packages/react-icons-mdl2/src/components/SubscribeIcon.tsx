import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SubscribeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1276q1 2 1 29t1 69 0 97 0 111-1 114 0 102-1 79 0 43H0v-42-79q0-47-1-103t0-113-1-112 0-96 0-70 2-29L383 128h385v128H475L134 1280h418l128 256h560l128-256h418L1445 256h-293V128h385l383 1148zm-128 132h-344l-128 256H600l-128-256H128v384h1664v-384zM896 933V0h128v933l294-293 90 90-448 448-448-448 90-90 294 293z" />
    </svg>
  ),
  displayName: 'SubscribeIcon',
});

export default SubscribeIcon;
