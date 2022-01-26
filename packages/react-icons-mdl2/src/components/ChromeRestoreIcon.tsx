import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChromeRestoreIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1638h-410v410H0V410h410V0h1638v1638zM1434 614H205v1229h1229V614zm409-409H614v205h1024v1024h205V205z" />
    </svg>
  ),
  displayName: 'ChromeRestoreIcon',
});

export default ChromeRestoreIcon;
