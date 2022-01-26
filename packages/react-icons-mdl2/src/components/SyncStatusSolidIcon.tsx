import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SyncStatusSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm0 1558q77 0 149-21t136-62 114-96 84-126l-156-74q-23 47-57 85t-77 65-92 42-101 15q-72 0-137-28t-117-78h126v-128H512v384h128v-142q75 78 175 121t209 43zm512-662V512h-128v142q-75-78-175-121t-209-43q-77 0-149 21t-136 62-114 96-84 126l156 74q22-47 56-85t78-65 92-42 101-15q72 0 137 28t117 78h-126v128h384z" />
    </svg>
  ),
  displayName: 'SyncStatusSolidIcon',
});

export default SyncStatusSolidIcon;
