import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const M365InvoicingLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1461 717H430V512h1031v205zm-693 435h1280v410q0 74-28 139t-77 114-114 77-139 28H358q-74 0-139-28t-114-77-77-114-28-139V0h1894v998h-204V205H205v1357q0 32 12 59t33 49 48 33 60 12h256q31 0 59-12t49-33 33-49 13-59v-410zm1075 410v-205H973v205q0 40-8 79t-27 74h752q31 0 59-12t49-33 33-48 12-60z" />
    </svg>
  ),
  displayName: 'M365InvoicingLogoIcon',
});

export default M365InvoicingLogoIcon;
