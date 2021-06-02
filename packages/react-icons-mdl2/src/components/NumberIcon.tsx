import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024q0 142-36 272t-103 245-160 207-208 160-245 103-272 37q-142 0-272-36t-245-103-207-160-160-208-103-245-37-272q0-141 36-272t103-245 160-207 208-160T752 37t272-37q141 0 272 36t245 103 207 160 160 208 103 245 37 272zm-1024 896q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-124 0-238 32t-213 90-182 141-140 181-91 214-32 238q0 124 32 238t90 213 141 182 181 140 214 91 238 32zm58-1472h70v1152h-128V694q-57 36-122 55t-134 19V640q103 0 184-51t130-141z" />
    </svg>
  ),
  displayName: 'NumberIcon',
});

export default NumberIcon;
