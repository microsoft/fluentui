import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StackColumnChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792h1664v128H128V129h128v1663zM1792 256v1408h-384V256h384zm-256 1280h128V768h-128v768zm128-896V384h-128v256h128zm-384-384v1408H896V256h384zm-128 1280v-256h-128v256h128zm0-384V384h-128v768h128zM768 256v1408H384V256h384zM640 1536v-512H512v512h128zm0-640V384H512v512h128z" />
    </svg>
  ),
  displayName: 'StackColumnChartIcon',
});

export default StackColumnChartIcon;
