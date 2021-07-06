import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SkypeCircleMinusIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm323 1132q22 0 42-8t34-23 23-34 9-43q0-22-8-42t-23-34-35-23-42-9H701q-23 0-42 8t-34 23-23 35-9 42q0 23 8 42t23 34 34 23 43 9h646z" />
    </svg>
  ),
  displayName: 'SkypeCircleMinusIcon',
});

export default SkypeCircleMinusIcon;
