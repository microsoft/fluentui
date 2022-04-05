import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RightTriangleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2011 1920H128V37l1883 1883zM256 1792h1445L256 347v1445z" />
    </svg>
  ),
  displayName: 'RightTriangleIcon',
});

export default RightTriangleIcon;
