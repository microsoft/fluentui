import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretSolid16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 2048L2048 0v2048H0z" />
    </svg>
  ),
  displayName: 'CaretSolid16Icon',
});

export default CaretSolid16Icon;
