import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckListCheckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M493 349L192 650 19 477l90-90 83 82 211-210 90 90zM192 1621l211-210 90 90-301 301-173-173 90-90 83 82zm0-768l211-210 90 90-301 301L19 861l90-90 83 82zm0 384l211-210 90 90-301 301-173-173 90-90 83 82z" />
    </svg>
  ),
  displayName: 'CheckListCheckIcon',
});

export default CheckListCheckIcon;
