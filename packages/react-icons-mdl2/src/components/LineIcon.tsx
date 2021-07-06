import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1939l-90 90L19 109l90-90 1920 1920z" />
    </svg>
  ),
  displayName: 'LineIcon',
});

export default LineIcon;
