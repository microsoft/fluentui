import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReviewRequestMirroredSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2029 1939q19 19 19 45t-19 45-45 19q-26 0-45-19l-785-784q-95 80-210 121t-240 42q-97 0-187-25t-168-71-143-110-110-142-71-169T0 704q0-97 25-187t71-168 110-143T348 96t169-71T704 0q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 124-41 239t-122 211l784 785zM768 1024H640v128h128v-128zm264-512q0-66-29-115t-76-83-105-49-118-17q-60 0-118 19t-105 56-76 89-29 117q0 53 19 92t47 70 62 55 61 48 48 48 19 54h144q0-53-19-92t-47-70-62-55-61-48-48-48-19-54q0-34 18-59t45-43 59-26 62-9q27 0 59 6t60 20 46 38 19 56h144z" />
    </svg>
  ),
  displayName: 'ReviewRequestMirroredSolidIcon',
});

export default ReviewRequestMirroredSolidIcon;
