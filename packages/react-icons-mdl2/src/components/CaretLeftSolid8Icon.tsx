import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretLeftSolid8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 1024L1536 0v2048L512 1024z" />
    </svg>
  ),
  displayName: 'CaretLeftSolid8Icon',
});

export default CaretLeftSolid8Icon;
