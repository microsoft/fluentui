import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SortUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1453 499l-90 90-338-337-1 1796H896l1-1799-340 340-90-90L960 6l493 493z" />
    </svg>
  ),
  displayName: 'SortUpIcon',
});

export default SortUpIcon;
