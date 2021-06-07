import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StackedColumnChart2FillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256v1408h-384V256h384zm-128 384V384h-128v256h128zm-384 128v896H896V768h384zm-128 384V896h-128v256h128zM768 512v1152H384V512h384zM640 896V640H512v256h128zm-384 896h1664v128H128V128h128v1664z" />
    </svg>
  ),
  displayName: 'StackedColumnChart2FillIcon',
});

export default StackedColumnChart2FillIcon;
