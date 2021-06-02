import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretBottomRightSolid8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 64v1984H64L2048 64z" />
    </svg>
  ),
  displayName: 'CaretBottomRightSolid8Icon',
});

export default CaretBottomRightSolid8Icon;
