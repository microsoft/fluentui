import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const DelveLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1280 1280h256v384h-256v-384zm704-896v448h-384V384h384zm-704 0h256v832h-256V384zm320 512h384v768h-384V896zm-839 110q0 43-8 90t-30 87-56 65-89 26h-37q-18 0-38-2V762q19-2 37-3t39-1q52 0 87 22t56 58 30 80 9 88zM64 263L1216 56v1936L64 1791V263zm312 1146l114 10q57 5 114 6 57 0 102-18t80-48 59-72 41-89 23-97 7-98q0-76-13-147t-46-127-91-89-146-34q-61 0-122 7t-122 13v783z" />
    </svg>
  ),
  displayName: 'DelveLogoInverseIcon',
});

export default DelveLogoInverseIcon;
