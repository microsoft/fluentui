import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BarChart4Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 2048v-640h384v640H0zm512 0V896h384v1152H512zM1536 896h384v1152h-384V896zm-512 1152V384h384v1664h-384z" />
    </svg>
  ),
  displayName: 'BarChart4Icon',
});

export default BarChart4Icon;
