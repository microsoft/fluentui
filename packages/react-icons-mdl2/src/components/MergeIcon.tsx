import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MergeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1792v256h-43q-225 0-409-122-163-107-279-301-22-37-42-76t-38-81q-17 42-37 81t-42 76q-116 194-279 301-185 122-410 122h-42v-256h42q291 0 469-298 41-68 73-148t53-167 33-180 12-188V412l-240 60q-8 2-13 2-20 0-32-15t-13-33q0-19 14-33L948 14q14-14 33-14 18 0 34 14l379 379q14 14 14 34 0 18-13 32t-33 15q-5 0-13-2l-240-60v399q0 95 11 187t34 180 54 168 73 148q178 298 468 298h43z" />
    </svg>
  ),
  displayName: 'MergeIcon',
});

export default MergeIcon;
