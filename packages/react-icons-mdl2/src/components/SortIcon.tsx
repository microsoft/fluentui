import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SortIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1069 499l-90 90-338-337-1 1796H512l1-1799-340 340-90-90L576 6l493 493zm807 960l91 90-493 493-494-493 91-90 338 338-1-1797h128l1 1798 339-339z" />
    </svg>
  ),
  displayName: 'SortIcon',
});

export default SortIcon;
