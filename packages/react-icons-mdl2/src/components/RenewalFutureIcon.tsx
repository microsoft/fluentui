import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RenewalFutureIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792zm-870-576l-429 429-90-90 339-339-339-339 90-90 429 429zm83-429l429 429-429 429-90-90 339-339-339-339 90-90z" />
    </svg>
  ),
  displayName: 'RenewalFutureIcon',
});

export default RenewalFutureIcon;
