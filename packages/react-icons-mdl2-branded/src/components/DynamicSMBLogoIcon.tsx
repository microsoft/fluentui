import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const DynamicSMBLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M937 1200l227-225v1073H708v-817l229-31zM93 1314l472-63v797H93v-734zm1210-477l472-465v1676h-472V837zM1966 0q4-1 7 2t3 7v2l-43 233q0 2-2 4t-4 3q-7 0-10-3l-78-80-944 932q-6 6-16 8l-776 104q-13 2-22-7t-9-21q0-11 7-18t17-9l766-104 938-925q-4-4-18-17t-29-29-28-29-12-17q0-7 9-9l244-27z" />
    </svg>
  ),
  displayName: 'DynamicSMBLogoIcon',
});

export default DynamicSMBLogoIcon;
