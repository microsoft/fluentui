import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TabTwoColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 256h896v1792H0V0h1024v256zm768 1664V384H896V128H128v1792h1664zM256 1792V512h640v1280H256zM384 640v1024h384V640H384zm1280-128v1280h-640V512h640zm-128 1152V640h-384v1024h384z" />
    </svg>
  ),
  displayName: 'TabTwoColumnIcon',
});

export default TabTwoColumnIcon;
