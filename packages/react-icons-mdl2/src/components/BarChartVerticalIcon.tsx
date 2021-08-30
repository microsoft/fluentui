import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChartVerticalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 512v1152H384V512h384zM640 1536V640H512v896h128zm640-768v896H896V768h384zm-128 768V896h-128v640h128zm640-1280v1408h-384V256h384zm-128 1280V384h-128v1152h128zM256 1792h1664v128H128V128h128v1664z" />
    </svg>
  ),
  displayName: 'BarChartVerticalIcon',
});

export default BarChartVerticalIcon;
