import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const MSNVideosIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-244-37-273q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm0 1920q124 0 238-32t214-90 181-140 140-181 91-214 32-239q0-124-32-238t-90-214-140-181-181-140-214-91-239-32q-124 0-238 32t-214 90-181 140-140 181-91 214-32 239q0 124 32 238t90 214 140 182 181 140 214 90 239 32zM768 512l768 509-768 515V512zm128 784l409-274-409-272v546z" />
    </svg>
  ),
  displayName: 'MSNVideosIcon',
});

export default MSNVideosIcon;
