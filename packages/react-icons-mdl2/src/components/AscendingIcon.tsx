import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AscendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1216 1024h512l-320 640h320v128h-512l320-640h-320v-128zm-704 614l163-163 90 90-317 318-317-318 90-90 163 163V128h128v1510zm811-870l-43 128h-128l256-768h128l256 768h-128l-43-128h-298zm149-448l-107 320h214l-107-320z" />
    </svg>
  ),
  displayName: 'AscendingIcon',
});

export default AscendingIcon;
