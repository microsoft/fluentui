import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const DelveLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 256q26 0 45 19t19 45v1408q0 26-19 45t-45 19h-704v200L64 1791V263L1216 56v200h704zM604 1425q57 0 102-18t80-48 59-72 41-89 23-97 7-98q0-76-13-147t-46-127-91-89-146-34q-61 0-122 7t-122 13v783l114 10q57 5 114 6zm868-17h-256v320h256v-320zm0-1088h-256v1024h256V320zm448 448h-384v960h384V768zm0-448h-384v384h384V320zM503 762q19-2 37-3t39-1q52 0 87 22t56 58 30 80 9 88q0 43-8 90t-30 87-56 65-89 26h-37q-18 0-38-2V762z" />
    </svg>
  ),
  displayName: 'DelveLogoIcon',
});

export default DelveLogoIcon;
