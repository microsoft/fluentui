import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BoxSubtractSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v1920H0V0h1920zm-384 896H384v128h1152V896z" />
    </svg>
  ),
  displayName: 'BoxSubtractSolidIcon',
});

export default BoxSubtractSolidIcon;
