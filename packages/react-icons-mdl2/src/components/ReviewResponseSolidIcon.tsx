import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReviewResponseSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1939q19 19 19 45t-19 45-45 19q-26 0-45-19l-785-784q-95 80-210 121t-240 42q-97 0-187-25t-168-71-143-110-110-142-71-169T0 704q0-97 25-187t71-168 110-143T348 96t169-71T704 0q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 124-41 239t-122 211l784 785zM1146 525l-135-135-435 434-156-156-136 136 292 292 570-571z" />
    </svg>
  ),
  displayName: 'ReviewResponseSolidIcon',
});

export default ReviewResponseSolidIcon;
