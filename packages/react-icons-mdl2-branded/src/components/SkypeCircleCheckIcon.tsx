import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const SkypeCircleCheckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zM907 1347q22 0 42-8t35-24l429-429q15-15 23-35t8-41q0-22-8-42t-23-34-35-23-42-9q-21 0-41 8t-36 23l-352 352-118-118q-32-32-77-32-22 0-42 8t-35 24-23 34-9 42q0 21 8 41t24 36l195 195q15 15 35 23t42 9z" />
    </svg>
  ),
  displayName: 'SkypeCircleCheckIcon',
});

export default SkypeCircleCheckIcon;
