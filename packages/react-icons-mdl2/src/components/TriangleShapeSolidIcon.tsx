import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleShapeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1920H0L960 0l960 1920z" />
    </svg>
  ),
  displayName: 'TriangleShapeSolidIcon',
});

export default TriangleShapeSolidIcon;
