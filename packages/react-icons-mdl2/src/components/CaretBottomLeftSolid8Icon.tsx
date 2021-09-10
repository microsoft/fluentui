import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretBottomLeftSolid8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1984 2048H0V64l1984 1984z" />
    </svg>
  ),
  displayName: 'CaretBottomLeftSolid8Icon',
});

export default CaretBottomLeftSolid8Icon;
