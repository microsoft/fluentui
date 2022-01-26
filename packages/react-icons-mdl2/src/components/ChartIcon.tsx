import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 512h512v512h-128V731l-576 575-256-256-704 705v37h1664v128H128V128h128v1445l704-703 256 256 485-486h-293V512z" />
    </svg>
  ),
  displayName: 'ChartIcon',
});

export default ChartIcon;
