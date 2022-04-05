import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OfficeVideoLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 512q26 0 45 19t19 45v960q0 26-19 45t-45 19h-704v392L64 1791V263L1216 56v456h704zM905 641H747q-29 140-57 279t-59 279q-35-138-70-273t-72-270H331l220 759h164l190-774zm1015-65h-704v299q42-51 100-79t124-28q60 0 112 22t92 62 61 91 23 113q0 60-22 112t-62 92-91 61-113 23q-66 0-124-28t-100-79v299h704V576zm-336 480l-240-147v294l240-147z" />
    </svg>
  ),
  displayName: 'OfficeVideoLogoIcon',
});

export default OfficeVideoLogoIcon;
