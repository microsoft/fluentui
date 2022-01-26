import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RectangleShapeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v1280H0V384h2048z" />
    </svg>
  ),
  displayName: 'RectangleShapeSolidIcon',
});

export default RectangleShapeSolidIcon;
