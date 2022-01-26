import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GlobalNavButtonActiveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 1024q-66 0-124-25t-102-68-69-102-25-125q0-66 25-124t68-102 102-69 125-25q66 0 124 25t102 68 69 102 25 125q0 66-25 124t-68 102-102 69-125 25zm-474-512q-12 31-19 63t-13 65H0V512h1254zm78 512q65 80 153 128H0v-128h1332zM0 1664v-128h2048v128H0z" />
    </svg>
  ),
  displayName: 'GlobalNavButtonActiveIcon',
});

export default GlobalNavButtonActiveIcon;
