import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChartVerticalFilterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 384v768h-128V256h384v896h-128V384h-128zm-384 1152l128 128H768V768h384v384h-128V896H896v640h128zM640 512v1152H256V512h384zM512 1536V640H384v896h128zm640-256h896v152l-256 288v328h-384v-328l-256-288v-152zm512 392l234-264h-596l234 264v248h128v-248zM128 128v1664h1152v128H0V128h128z" />
    </svg>
  ),
  displayName: 'BarChartVerticalFilterIcon',
});

export default BarChartVerticalFilterIcon;
