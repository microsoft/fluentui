import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronUpEnd6Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 783l1017 1016-242 242-775-776-775 776L7 1799 1024 783zM2048 0v341H0V0h2048z" />
    </svg>
  ),
  displayName: 'ChevronUpEnd6Icon',
});

export default ChevronUpEnd6Icon;
