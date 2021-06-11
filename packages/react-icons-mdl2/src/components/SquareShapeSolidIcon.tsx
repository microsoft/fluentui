import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SquareShapeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H128V128h1792z" />
    </svg>
  ),
  displayName: 'SquareShapeSolidIcon',
});

export default SquareShapeSolidIcon;
