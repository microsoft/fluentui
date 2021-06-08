import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChartVerticalFilterSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1536l128 128H768V768h384v384h-128v384zm640-1280v896h-384V256h384zM640 512v1152H256V512h384zM128 128v1664h1152v128H0V128h128zm1024 1152h896v152l-256 288v328h-384v-328l-256-288v-152z" />
    </svg>
  ),
  displayName: 'BarChartVerticalFilterSolidIcon',
});

export default BarChartVerticalFilterSolidIcon;
