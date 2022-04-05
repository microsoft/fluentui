import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BoxCheckmarkSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v1920H0V0h1920zm-358 621l-135-135-659 658-275-274-135 135 410 411 794-795z" />
    </svg>
  ),
  displayName: 'BoxCheckmarkSolidIcon',
});

export default BoxCheckmarkSolidIcon;
