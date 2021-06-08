import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DropdownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v1408H0V256zm1920 1280V384H128v1152h1792zm-128-640l-256 256-256-256h512z" />
    </svg>
  ),
  displayName: 'DropdownIcon',
});

export default DropdownIcon;
