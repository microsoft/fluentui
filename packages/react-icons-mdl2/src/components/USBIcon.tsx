import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const USBIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 256h128v128H768V256zm384 0v128h-128V256h128zm256 256q27 0 50 10t40 27 28 41 10 50v1280q0 27-10 50t-27 40-41 28-50 10H512q-27 0-50-10t-40-27-28-41-10-50V640q0-27 10-50t27-40 41-28 50-10V0h896v512zm-768 0h640V128H640v384zm768 128H512v1280h896V640z" />
    </svg>
  ),
  displayName: 'USBIcon',
});

export default USBIcon;
