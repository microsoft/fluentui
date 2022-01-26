import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretTopLeftSolid8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h1984L0 1984V0z" />
    </svg>
  ),
  displayName: 'CaretTopLeftSolid8Icon',
});

export default CaretTopLeftSolid8Icon;
