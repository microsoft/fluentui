import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretUpSolid8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 512l1024 1024H0L1024 512z" />
    </svg>
  ),
  displayName: 'CaretUpSolid8Icon',
});

export default CaretUpSolid8Icon;
