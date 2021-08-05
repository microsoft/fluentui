import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VSTSLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 373v1254l-518 421-799-293v293l-438-585 1316 101V439l439-66zM293 711v752L0 1338V749l200-261 678-195V0l731 439L293 711z" />
    </svg>
  ),
  displayName: 'VSTSLogoIcon',
});

export default VSTSLogoIcon;
