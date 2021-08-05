import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SkypeCircleSlashIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm432 1349q0-46-31-77L776 623q-31-31-77-31-22 0-41 8t-35 23-23 35-9 42q0 44 32 76l649 649q32 32 76 32 22 0 42-8t34-24 23-34 9-42z" />
    </svg>
  ),
  displayName: 'SkypeCircleSlashIcon',
});

export default SkypeCircleSlashIcon;
