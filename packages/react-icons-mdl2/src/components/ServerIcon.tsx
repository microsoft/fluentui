import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ServerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 384H640V256h640v128zm0 1024H640v-128h640v128zm0 256H640v-128h640v128zM1408 0q27 0 50 10t40 27 28 41 10 50v1792H384V128q0-27 10-50t27-40 41-28 50-10h896zm0 128H512v1664h896V128z" />
    </svg>
  ),
  displayName: 'ServerIcon',
});

export default ServerIcon;
