import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlugIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 384v448q0 83-29 158t-80 135-122 98-153 52v773H896v-773q-83-12-153-51t-121-99-81-134-29-159V384h128V0h128v384h384V0h128v384h128zm-128 128H640v320q0 66 25 124t68 102 102 69 125 25q66 0 124-25t101-68 69-102 26-125V512z" />
    </svg>
  ),
  displayName: 'PlugIcon',
});

export default PlugIcon;
