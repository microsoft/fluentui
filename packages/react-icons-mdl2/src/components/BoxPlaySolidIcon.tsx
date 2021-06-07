import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BoxPlaySolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v1920H0V0h1920zm-576 957L576 448v1024l768-515z" />
    </svg>
  ),
  displayName: 'BoxPlaySolidIcon',
});

export default BoxPlaySolidIcon;
