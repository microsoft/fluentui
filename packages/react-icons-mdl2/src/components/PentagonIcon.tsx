import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PentagonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2042 723l-389 1197H395L6 723 1024 18l1018 705zm-151 51l-867-600-867 600 331 1018h1072l331-1018z" />
    </svg>
  ),
  displayName: 'PentagonIcon',
});

export default PentagonIcon;
