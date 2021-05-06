import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const MicrosoftFlowLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1760 256q60 0 112 22t92 62 61 91 23 113v768q0 60-22 112t-62 92-91 61-113 23h-672v-128h672q33 0 62-12t51-35 34-51 13-62V544q0-33-12-62t-35-51-51-34-62-13H288q-33 0-62 12t-51 35-34 51-13 62v672H0V544q0-60 22-112t62-92 91-61 113-23h1472zm-626 896q-19 0-32-13t-14-33V960H973l-225 620q-10 28-27 45t-38 26-45 12-50 3q-20 0-39-1t-37-1v96q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h320q40 0 68 28t28 68v96h115l226-620q10-28 26-45t38-26 45-12 49-3q20 0 39 1t38 1V686q0-19 13-32t33-14h420q19 0 32 13t14 33v420q0 19-13 32t-33 14h-420zm-750 320H128v256h256v-256z" />
    </svg>
  ),
  displayName: 'MicrosoftFlowLogoIcon',
});

export default MicrosoftFlowLogoIcon;
