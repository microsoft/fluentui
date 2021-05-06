import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const MixerLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M234 256q53 0 100 24t80 67l456 612q20 28 20 64 0 35-20 63l-458 615q-32 44-79 67t-102 24q-47 0-88-17t-72-48-48-72-18-89q0-38 12-74t36-67l299-403L55 623q-23-31-35-68T8 479q0-46 18-87t48-71 72-47 88-18zm1633 1169q23 31 35 67t13 74q0 47-17 88t-48 72-72 48-89 18q-54 0-101-23t-80-68l-458-615q-20-28-20-63 0-36 20-64l456-612q32-42 79-66t101-25q46 0 87 17t72 48 49 71 18 87q0 39-12 76t-35 69l-297 398 299 403zm-180 239q21 0 39-7t31-20 21-31 8-39q0-36-22-66l-356-479 354-475q22-30 22-65 0-43-28-70t-71-28q-23 0-42 11t-34 29l-446 599 448 601q14 18 33 29t43 11z" />
    </svg>
  ),
  displayName: 'MixerLogoIcon',
});

export default MixerLogoIcon;
