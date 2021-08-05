import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VisualStudioLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1472 128l448 171v1429l-448 192-704-704-469 363-171-107V577l171-108 469 363 704-704zM320 1280l256-256-256-256v512zm1152 128V640l-448 384 448 384z" />
    </svg>
  ),
  displayName: 'VisualStudioLogoIcon',
});

export default VisualStudioLogoIcon;
