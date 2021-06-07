import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LineChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M705 978l-449 449v366h1664v128H128V129h128v1132l449-449 255 257 704-704 256 256v166l-256-256-704 704-255-257z" />
    </svg>
  ),
  displayName: 'LineChartIcon',
});

export default LineChartIcon;
