import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StopwatchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1152v128H896V640h128v512h384zm231-652q135 136 208 297t73 355q0 124-32 238t-90 214-140 181-181 140-214 91-239 32q-124 0-238-32t-214-90-181-140-140-181-91-214-32-239q0-111 26-216t75-198 118-172 154-141 185-103 210-57V128H640V0h640v128h-256v128q139 0 270 41t245 122l208-208 90 90-198 199zm-615 1420q159 0 298-60t244-165 165-244 61-299q0-159-60-298t-165-244-244-165-299-61q-159 0-298 60T482 609 317 853t-61 299q0 159 60 298t165 244 244 165 299 61z" />
    </svg>
  ),
  displayName: 'StopwatchIcon',
});

export default StopwatchIcon;
