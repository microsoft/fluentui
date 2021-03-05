import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const CortanaLogoOuterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm0 1907q122 0 234-31t211-89 179-139 138-179 89-210 32-235q0-122-31-234t-89-211-139-179-179-138-210-89-235-32q-122 0-234 31t-211 89-179 139-138 179-89 210-32 235q0 122 31 234t89 211 139 179 179 138 210 89 235 32z" />
    </svg>
  ),
  displayName: 'CortanaLogoOuterIcon',
});

export default CortanaLogoOuterIcon;
