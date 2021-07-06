import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronRightSmallIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M590 7l1017 1017L590 2041l-241-242 775-775-775-775L590 7z" />
    </svg>
  ),
  displayName: 'ChevronRightSmallIcon',
});

export default ChevronRightSmallIcon;
