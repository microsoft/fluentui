import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OutOfOfficeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 1024q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19zm-832 256h128v768H768v-768zM1920 0v2048h-128V128H896v768H768V0h1152zM347 1024h805v128H347l210 211-90 90-365-365 365-365 90 90-210 211z" />
    </svg>
  ),
  displayName: 'OutOfOfficeIcon',
});

export default OutOfOfficeIcon;
