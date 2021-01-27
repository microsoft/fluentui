import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SkypeCircleArrowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 271 36t245 104 207 160 161 208 103 244 37 272q0 141-36 271t-104 245-160 207-208 161-244 103-272 37q-141 0-271-36t-245-104-207-160-161-208-103-244-37-272q0-141 36-271t104-245 160-207 208-161T752 37t272-37zm553 1024q0-22-8-41t-24-35-35-23-42-9H824q19-19 50-45t62-56 51-63 22-68q0-22-8-42t-24-34-35-22-42-9q-21 0-41 8t-35 23L486 947h-1q-14 14-23 33t-9 39q0 23 7 44t25 38h1l338 339q31 31 77 31 47 0 77-31t31-79q0-31-22-64t-53-64-61-57-49-44h644q22 0 42-8t35-24 23-34 9-42z" />
    </svg>
  ),
  displayName: 'SkypeCircleArrowIcon',
});

export default SkypeCircleArrowIcon;
