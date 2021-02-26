import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeVideoLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M64 263L1216 56v1936L64 1791V263zm425 393H331l220 759h164l190-774H747q-29 140-57 279t-59 279q-35-138-70-274t-72-274v5zm1015 688q-66 0-124-29t-100-80V877q42-51 100-80t124-29q60 0 112 22t92 62 61 91 23 113q0 60-22 112t-62 92-91 61-113 23zm-96-141l240-147-240-147v294zm512-691q27 0 50 10t40 27 28 41 10 50v832q0 27-10 50t-27 40-41 28-50 10h-640v-128h640V640h-640V512h640z" />
    </svg>
  ),
  displayName: 'OfficeVideoLogoInverseIcon',
});

export default OfficeVideoLogoInverseIcon;
