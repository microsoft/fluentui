import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const DocsLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M761 999q0 44-9 91t-30 87-57 64-90 26q-18 0-36-1t-36-2V754q20-1 39-2t40-1q51 0 85 22t56 59 29 80 9 87zM64 273L1216 68v1912L64 1781V273zm312 1129q57 4 114 9t114 6q86 0 145-38t97-100 53-136 17-148q0-76-13-147t-46-127-91-89-146-34q-61 0-122 7t-122 13v784zm1508-358h-483v483h-121V924h443v-81h-443V723h443v-81h-443V521h443v-80h-443V320h563q17 0 29 11t12 29v684zm120 81v603h-523v-603h523zm-281 80q-42 0-78 15t-64 43-44 64-16 79h202v-201zm40 443q42 0 78-16t64-43 43-63 16-79q0-42-16-78t-43-64-63-43-79-16v201h-201q0 42 16 78t43 64 63 43 79 16z" />
    </svg>
  ),
  displayName: 'DocsLogoInverseIcon',
});

export default DocsLogoInverseIcon;
