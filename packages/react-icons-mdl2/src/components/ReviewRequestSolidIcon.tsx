import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReviewRequestSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1939q19 19 19 45t-19 45-45 19q-26 0-45-19l-785-784q-95 80-210 121t-240 42q-97 0-187-25t-168-71-143-110-110-142-71-169T0 704q0-97 25-187t71-168 110-143T348 96t169-71T704 0q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 124-41 239t-122 211l784 785zM768 1024H640v128h128v-128zm8-128q0-30 19-54t47-47 62-48 61-56 48-70 19-92q0-65-29-117t-75-88-105-56-119-20q-59 0-117 16t-106 50-76 82-29 116h144q0-33 18-56t47-37 60-21 59-6q29 0 61 9t60 26 45 42 18 60q0 30-19 54t-47 47-62 48-61 56-48 70-19 92h144z" />
    </svg>
  ),
  displayName: 'ReviewRequestSolidIcon',
});

export default ReviewRequestSolidIcon;
