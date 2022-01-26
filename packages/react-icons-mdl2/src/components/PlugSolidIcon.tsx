import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlugSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 384v448q0 84-29 159t-80 134-122 98-153 52v773H896v-773q-83-12-153-51t-121-99-81-134-29-159V384h128V0h128v384h384V0h128v384h128z" />
    </svg>
  ),
  displayName: 'PlugSolidIcon',
});

export default PlugSolidIcon;
