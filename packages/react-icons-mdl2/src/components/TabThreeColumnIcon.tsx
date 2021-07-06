import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TabThreeColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 256h896v1792H0V0h1024v256zm768 1664V384H896V128H128v1792h1664zM256 1792V512h384v1280H256zM384 640v1024h128V640H384zm384 1152V512h384v1280H768zM896 640v1024h128V640H896zm768-128v1280h-384V512h384zm-128 1152V640h-128v1024h128z" />
    </svg>
  ),
  displayName: 'TabThreeColumnIcon',
});

export default TabThreeColumnIcon;
