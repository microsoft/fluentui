import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleInnerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 256q115 0 221 30t198 84 169 130 130 168 84 199 30 221q0 115-30 221t-84 198-130 169-168 130-199 84-221 30q-115 0-221-30t-198-84-169-130-130-168-84-199-30-221q0-115 30-221t84-198 130-169 168-130 199-84 221-30z" />
    </svg>
  ),
  displayName: 'StatusCircleInnerIcon',
});

export default StatusCircleInnerIcon;
