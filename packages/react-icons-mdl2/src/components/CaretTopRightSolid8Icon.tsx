import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretTopRightSolid8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M64 0h1984v1984L64 0z" />
    </svg>
  ),
  displayName: 'CaretTopRightSolid8Icon',
});

export default CaretTopRightSolid8Icon;
