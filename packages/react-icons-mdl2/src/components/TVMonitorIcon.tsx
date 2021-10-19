import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TVMonitorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1408h-896v128h256v128H640v-128h256v-128H0V256h1920v1152zM128 384v896h1664V384H128z" />
    </svg>
  ),
  displayName: 'TVMonitorIcon',
});

export default TVMonitorIcon;
