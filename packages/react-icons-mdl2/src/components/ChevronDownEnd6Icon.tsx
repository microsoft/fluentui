import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronDownEnd6Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1265L7 249 249 7l775 776L1799 7l242 242-1017 1016zm1024 442v341H0v-341h2048z" />
    </svg>
  ),
  displayName: 'ChevronDownEnd6Icon',
});

export default ChevronDownEnd6Icon;
