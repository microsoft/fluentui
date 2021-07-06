import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TabletIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1888 256q33 0 62 12t51 35 34 51 13 62v1216q0 33-12 62t-35 51-51 34-62 13H160q-33 0-62-12t-51-35-34-51-13-62V416q0-33 12-62t35-51 51-34 62-13h1728zm32 1376V416q0-14-9-23t-23-9H160q-14 0-23 9t-9 23v1216q0 14 9 23t23 9h1728q14 0 23-9t9-23zm-1024-96v-128h256v128H896z" />
    </svg>
  ),
  displayName: 'TabletIcon',
});

export default TabletIcon;
