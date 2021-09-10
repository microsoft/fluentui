import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BoxMultiplySolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v1920H0V0h1920zm-847 960l342-342-113-113-342 342-342-342-113 113 342 342-342 342 113 113 342-342 342 342 113-113-342-342z" />
    </svg>
  ),
  displayName: 'BoxMultiplySolidIcon',
});

export default BoxMultiplySolidIcon;
