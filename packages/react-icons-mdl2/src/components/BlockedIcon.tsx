import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BlockedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q141 0 271 36t245 104 207 160 161 208 103 244 37 272q0 141-36 271t-104 245-160 207-208 161-244 103-272 37q-141 0-271-36t-245-104-207-160-161-208-103-244-37-272q0-141 36-271t104-245 160-207 208-161T752 37t272-37zm0 1920q164 0 313-56t274-163L347 437Q240 561 184 710t-56 314q0 124 32 238t90 214 140 181 181 140 214 91 239 32zm677-309q107-124 163-273t56-314q0-124-32-238t-90-214-140-181-181-140-214-91-239-32q-164 0-313 56T437 347l1264 1264z" />
    </svg>
  ),
  displayName: 'BlockedIcon',
});

export default BlockedIcon;
