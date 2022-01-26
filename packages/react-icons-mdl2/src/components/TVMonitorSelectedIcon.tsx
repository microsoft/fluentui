import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TVMonitorSelectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1716 1280l-128 128h-564v256H640v-128h256v-128H0V256h1920v820l-128 128V384H128v896h1588zm223 3l90 91-557 557-269-269 90-91 179 179 467-467z" />
    </svg>
  ),
  displayName: 'TVMonitorSelectedIcon',
});

export default TVMonitorSelectedIcon;
