import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RefreshIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1297 38q166 45 304 140t237 226 155 289 55 331q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-244-37-273q0-140 37-272t105-248 167-212 221-164H256V0h512v512H640V215q-117 56-211 140T267 545 164 773t-36 251q0 123 32 237t90 214 141 182 181 140 214 91 238 32q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-150-48-289t-136-253-207-197-266-124l34-123z" />
    </svg>
  ),
  displayName: 'RefreshIcon',
});

export default RefreshIcon;
