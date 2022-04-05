import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OneDriveLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1660 833q82 5 152 40t123 91 83 129 30 155q0 86-33 161t-89 132-132 90-162 33H512q-106 0-199-40t-162-110-110-163-41-199q0-84 26-161t74-141 113-113 146-74q37-11 72-16t74-7h1q44-67 103-120t128-91 145-57 158-20q109 0 209 35t183 99 142 152 86 195zm-620-353q-113 0-215 46T651 660q38 10 72 25t68 36l408 244 233-98q23-10 46-17t50-13q-25-80-73-145t-112-113-142-73-161-26zm-834 903l846-357-327-196q-50-30-105-46t-113-16q-78 0-147 31t-120 83-82 123-30 147q0 60 20 121t58 110zm1426 153q48 0 92-15t82-44l-617-369-879 370q45 28 96 43t106 15h1120zm257-158q31-62 31-130 0-66-25-120t-67-91-100-58-120-21q-36 0-71 8t-70 22-67 28-65 30l554 332z" />
    </svg>
  ),
  displayName: 'OneDriveLogoIcon',
});

export default OneDriveLogoIcon;
