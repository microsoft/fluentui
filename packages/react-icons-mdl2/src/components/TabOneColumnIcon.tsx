import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TabOneColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 256h896v1792H0V0h1024v256zm768 1664V384H896V128H128v1792h1664zM256 1792V512h1408v1280H256zM384 640v1024h1152V640H384z" />
    </svg>
  ),
  displayName: 'TabOneColumnIcon',
});

export default TabOneColumnIcon;
