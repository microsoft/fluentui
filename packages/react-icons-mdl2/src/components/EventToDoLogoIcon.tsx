import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventToDoLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 640v768h256v128H0V128h256V0h128v128h768V0h128v128h256v640h-128V640H128zm128-384H128v256h1280V256h-128v128h-128V256H384v128H256V256zm1792 828q0 20-8 39t-23 34q-208 208-412 414t-413 412q-32 30-75 30t-73-30l-411-410q-15-14-23-33t-8-41q0-43 31-74l177-177q31-31 74-31 42 0 73 31l160 160 576-575q30-30 73-30 20 0 40 8t35 22l176 177q14 14 22 33t9 41zM885 1642l143-143-144-144-143 144 144 143zm1025-559l-144-144q-199 200-395 397t-397 397q36 36 71 72t72 72q200-199 397-396t396-398z" />
    </svg>
  ),
  displayName: 'EventToDoLogoIcon',
});

export default EventToDoLogoIcon;
