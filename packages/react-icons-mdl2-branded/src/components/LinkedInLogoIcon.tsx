import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const LinkedInLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1896 0q31 0 58 11t49 32 33 47 12 58v1752q0 31-12 58t-33 47-48 31-59 12H151q-31 0-58-11t-48-32-33-47-12-58V148q0-31 12-58t32-47 48-31 59-12h1745zM607 1728V768H303v960h304zM455 634q36 0 68-13t57-38 38-56 14-69q0-37-14-69t-38-56-56-37-69-14q-36 0-68 14t-56 38-38 56-14 68q0 36 14 68t38 56 56 38 68 14zm1290 1094v-519q0-99-14-184t-53-147-111-98-186-36q-43 0-85 10t-81 30-69 49-53 68h-4V768H798v960h303v-466q0-48 6-93t26-81 55-56 95-21q58 0 90 24t47 61 18 84 3 90v458h304z" />
    </svg>
  ),
  displayName: 'LinkedInLogoIcon',
});

export default LinkedInLogoIcon;
