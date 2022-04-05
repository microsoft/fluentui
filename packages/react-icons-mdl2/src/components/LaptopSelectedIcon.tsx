import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LaptopSelectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1016 1592l72 72H128q-25 0-48-10t-41-29-28-41-11-48q0-16 3-36t10-39 16-36 22-30l205-206V384h1408v805l-91 91H347l-203 202q-3 3-6 10t-5 16-4 16-1 12h945l-57 56zm-632-440h1152V512H384v640zm1645 158l-557 557-269-269 90-91 179 179 467-467 90 91z" />
    </svg>
  ),
  displayName: 'LaptopSelectedIcon',
});

export default LaptopSelectedIcon;
