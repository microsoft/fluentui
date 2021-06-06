import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReturnKeyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1152H475l466 467-90 90-621-621 621-621 90 90-466 467h1189V384h128v768z" />
    </svg>
  ),
  displayName: 'ReturnKeyIcon',
});

export default ReturnKeyIcon;
