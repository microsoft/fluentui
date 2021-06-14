import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ApacheMavenLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2021 183q9 0 15 6t7 16v4l-317 1565q-3 18-22 18h-274q-9 0-15-6t-7-16v-4l181-1063-605 1078q-6 11-19 11H754q-8 0-13-5t-8-13L555 723 319 1775q-2 8-7 12t-14 5H27q-9 0-15-6t-7-16v-4L321 200q2-8 8-12t14-5h461q8 0 14 5t8 14l139 1047 543-1054q6-12 20-12h493z" />
    </svg>
  ),
  displayName: 'ApacheMavenLogoIcon',
});

export default ApacheMavenLogoIcon;
