import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SystemIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2000 1525q12 12 21 29t15 36 9 38 3 36q0 27-10 50t-27 40-41 28-50 10H128q-27 0-50-10t-40-27-28-41-10-50q0-16 3-35t9-39 15-36 21-29l208-208V384h1536v933l208 208zM384 1280h1280V512H384v768zm1536 384q0-11-4-28t-12-26l-203-202H347l-203 202q-8 8-12 25t-4 29h1792z" />
    </svg>
  ),
  displayName: 'SystemIcon',
});

export default SystemIcon;
