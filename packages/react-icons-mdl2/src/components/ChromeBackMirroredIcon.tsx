import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChromeBackMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M7 1024h1656l-674 674 144 145 922-921L1133 0 989 145l674 674H7v205z" />
    </svg>
  ),
  displayName: 'ChromeBackMirroredIcon',
});

export default ChromeBackMirroredIcon;
