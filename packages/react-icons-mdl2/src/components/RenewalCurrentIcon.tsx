import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RenewalCurrentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792zM877 787l429 429-429 429-90-90 339-339-339-339 90-90z" />
    </svg>
  ),
  displayName: 'RenewalCurrentIcon',
});

export default RenewalCurrentIcon;
