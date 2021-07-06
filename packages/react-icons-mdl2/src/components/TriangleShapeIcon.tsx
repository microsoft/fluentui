import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriangleShapeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1920H0L960 0l960 1920zM207 1792h1506L960 286 207 1792z" />
    </svg>
  ),
  displayName: 'TriangleShapeIcon',
});

export default TriangleShapeIcon;
