import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SortDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1364 1459l91 90-493 493-494-493 91-90 338 338L896 3h128l1 1795 339-339z" />
    </svg>
  ),
  displayName: 'SortDownIcon',
});

export default SortDownIcon;
