import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HomeVerifyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 1483l-128 128v-331H896v640H256v-805l-83 82-90-90 941-942 941 942-90 90-83-82v214l-128 128V987l-640-640-640 640v805h384v-640h512v331zm659-120l90 90-557 558-269-270 90-90 179 178 467-466z" />
    </svg>
  ),
  displayName: 'HomeVerifyIcon',
});

export default HomeVerifyIcon;
