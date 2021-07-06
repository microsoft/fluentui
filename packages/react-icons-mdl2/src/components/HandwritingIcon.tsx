import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HandwritingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1562 384q26 0 62-3t76-3 79 3 71 18 50 42 20 71v896q0 27-10 50t-27 40-41 28-50 10H128q-27 0-50-10t-40-27-28-41-10-50V512q0-27 10-50t27-40 41-28 50-10h870l325-325q28-28 64-43t77-16q41 0 77 16t63 43 43 63 16 78q0 33-7 57t-21 46-32 40-41 41zm-98-256q-29 0-50 21L594 969l-34 135 135-34 681-680q-2-2 0-5t5-1q12-12 38-34t52-47 45-53 20-50q0-30-21-51t-51-21zm328 384h-358l-673 674-377 94 94-377 392-391H128v896h1664V512z" />
    </svg>
  ),
  displayName: 'HandwritingIcon',
});

export default HandwritingIcon;
