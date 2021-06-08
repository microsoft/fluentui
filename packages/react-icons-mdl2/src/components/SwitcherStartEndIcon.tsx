import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SwitcherStartEndIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M211 467l365-365 365 365-90 90-211-210v1701H512V347L301 557l-90-90zm1536 1024l90 90-365 365-365-365 90-90 211 210V0h128v1701l211-210z" />
    </svg>
  ),
  displayName: 'SwitcherStartEndIcon',
});

export default SwitcherStartEndIcon;
