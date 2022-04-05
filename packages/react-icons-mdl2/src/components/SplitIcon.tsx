import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SplitIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1683 595l365 365-365 365-91-90 211-211h-651V896h651l-211-211 91-90zM456 685L245 896h651v128H245l211 211-91 90L0 960l365-365 91 90z" />
    </svg>
  ),
  displayName: 'SplitIcon',
});

export default SplitIcon;
