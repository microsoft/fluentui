import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DefaultRatioIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 860q-29 17-61 26t-67 10V768q27 0 50-10t40-27 28-41 10-50h128v640H640V860zm640 0q-29 17-61 26t-67 10V768q27 0 50-10t40-27 28-41 10-50h128v640h-128V860zm-320 36q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zm0 256q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM1920 0v1920H0V0h1920zm-128 128H128v1664h1664V128z" />
    </svg>
  ),
  displayName: 'DefaultRatioIcon',
});

export default DefaultRatioIcon;
