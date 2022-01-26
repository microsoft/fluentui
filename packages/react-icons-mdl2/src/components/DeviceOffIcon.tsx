import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeviceOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 384v896h957q-19 30-33 62t-26 66h-2v7q-2 12-6 24t-8 24q-8 34-13 68t-5 69q0 16 2 32t4 32H640v-128h256v-128H0V256h1920v829q-30-19-62-33t-66-26V384H128zm1472 768q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443z" />
    </svg>
  ),
  displayName: 'DeviceOffIcon',
});

export default DeviceOffIcon;
