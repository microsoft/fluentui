import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const BusinessCenterLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1728 512q40 0 75 15t61 41 41 61 15 75v768q0 40-15 75t-41 61-61 41-75 15H320q-40 0-75-15t-61-41-41-61-15-75V704q0-40 15-75t41-61 61-41 75-15h322q6-54 31-101t63-81 88-54 104-20h128q55 0 104 19t87 54 64 82 31 101h386zM928 384q-28 0-54 9t-47 27-35 40-21 52h442q-6-28-20-51t-36-41-47-26-54-10H928zm480 256H320q-26 0-45 19t-19 45v768q0 26 19 45t45 19h1088V640zm384 64q0-26-19-45t-45-19h-192v896h192q26 0 45-19t19-45V704z" />
    </svg>
  ),
  displayName: 'BusinessCenterLogoIcon',
});

export default BusinessCenterLogoIcon;
