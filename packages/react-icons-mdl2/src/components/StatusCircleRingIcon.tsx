import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleRingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 256q115 0 221 29t199 84 168 130 130 168 84 199 30 222q0 115-29 221t-84 199-130 168-168 130-199 84-222 30q-115 0-221-29t-199-84-168-130-130-168-84-199-30-222q0-115 29-221t84-199 130-168 168-130 199-84 222-30zm0 1536q97 0 187-25t168-71 142-110 111-143 71-168 25-187q0-97-25-187t-71-168-110-142-143-111-168-71-187-25q-97 0-187 25t-168 71-142 110-111 143-71 168-25 187q0 97 25 187t71 168 110 142 143 111 168 71 187 25z" />
    </svg>
  ),
  displayName: 'StatusCircleRingIcon',
});

export default StatusCircleRingIcon;
