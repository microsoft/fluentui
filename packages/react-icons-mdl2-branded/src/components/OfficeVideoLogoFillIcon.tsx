import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeVideoLogoFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1952 544v1024h-768V544h768zM729 608h209l-204 829H533L295 614h210l124 478 100-484z" />
    </svg>
  ),
  displayName: 'OfficeVideoLogoFillIcon',
});

export default OfficeVideoLogoFillIcon;
