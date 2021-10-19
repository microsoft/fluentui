import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChromeBackIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024H392l674 674-144 145L0 922 922 0l144 145-674 674h1656v205z" />
    </svg>
  ),
  displayName: 'ChromeBackIcon',
});

export default ChromeBackIcon;
