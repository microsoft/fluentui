import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StackedLineChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M702 848l-405 355 660 330 963-602v138l-957 598-707-353v479h1664v128H128V129h128v953l452-396 252 255 704-704 256 256v166l-256-256-704 704-258-259z" />
    </svg>
  ),
  displayName: 'StackedLineChartIcon',
});

export default StackedLineChartIcon;
