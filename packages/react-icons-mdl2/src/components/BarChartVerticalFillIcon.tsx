import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChartVerticalFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 768v896H896V768h384zm512-512v1408h-384V256h384zM256 1792h1664v128H128V128h128v1664zM768 512v1152H384V512h384z" />
    </svg>
  ),
  displayName: 'BarChartVerticalFillIcon',
});

export default BarChartVerticalFillIcon;
