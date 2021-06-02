import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DescendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 896h-512l320-640h-320V128h512l-320 640h320v128zM512 1638l163-163 90 90-317 318-317-318 90-90 163 163V128h128v1510zm1152 154l-43-128h-298l-43 128h-128l256-768h128l256 768h-128zm-299-256h214l-107-320-107 320z" />
    </svg>
  ),
  displayName: 'DescendingIcon',
});

export default DescendingIcon;
