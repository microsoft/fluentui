import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SkypeArrowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1980 964q0 41-15 77t-43 63-63 42-77 16H739l281 280q28 27 43 64t15 76q0 41-15 77t-43 63-63 42-77 16q-39 0-75-15t-65-43l-615-616q-33-33-47-68t-14-82q0-39 17-73t44-61l615-616q28-28 65-43t76-15q41 0 77 16t62 43 42 63 16 77q0 39-15 75t-43 64L739 766h1043q41 0 77 15t63 43 42 63 16 77z" />
    </svg>
  ),
  displayName: 'SkypeArrowIcon',
});

export default SkypeArrowIcon;
