import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleBookmarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0v1767l-256-128v385l-640-320-640 320V256h256V0h1280zm-384 1816V384H384v1432l512-256 512 256zm256-256V128H640v128h896v1240l128 64z" />
    </svg>
  ),
  displayName: 'DoubleBookmarkIcon',
});

export default DoubleBookmarkIcon;
