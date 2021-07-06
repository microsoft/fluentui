import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const CortanaLogoReadyOuterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm0 1536q106 0 199-40t163-109 110-163 40-200q0-106-40-199t-109-163-163-110-200-40q-106 0-199 40T662 661 552 824t-40 200q0 106 40 199t109 163 163 110 200 40z" />
    </svg>
  ),
  displayName: 'CortanaLogoReadyOuterIcon',
});

export default CortanaLogoReadyOuterIcon;
