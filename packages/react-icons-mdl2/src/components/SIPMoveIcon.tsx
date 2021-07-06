import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SIPMoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M493 749l-274 275 274 275-90 90-366-365 366-365 90 90zm806 806l90 90-365 366-365-366 90-90 275 274 275-274zm712-531l-366 365-90-90 274-275-274-275 90-90 366 365zM749 493l-90-90 365-366 365 366-90 90-275-274-275 274zm275 147q79 0 149 30t122 82 83 123 30 149q0 80-30 149t-82 122-123 83-149 30q-80 0-149-30t-122-82-83-122-30-150q0-79 30-149t82-122 122-83 150-30zm0 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'SIPMoveIcon',
});

export default SIPMoveIcon;
