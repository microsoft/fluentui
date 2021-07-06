import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChartHorizontalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 256v384H384V256h1152zm-128 256V384H512v128h896zm-128 256v384H384V768h896zm-128 256V896H512v128h640zm640 256v384H384v-384h1408zm-128 256v-128H512v128h1152zM256 1792h1664v128H128V128h128v1664z" />
    </svg>
  ),
  displayName: 'BarChartHorizontalIcon',
});

export default BarChartHorizontalIcon;
