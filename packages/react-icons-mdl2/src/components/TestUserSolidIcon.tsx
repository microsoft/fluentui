import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TestUserSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1848 1713q46 25 83 61t63 79 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100h-128q0-52 14-101t40-93 63-80 83-61q-34-35-53-81t-19-96q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 50-19 96t-53 81zm-184-49q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zm-356 16q-75 72-115 168t-41 200H354q-40 0-75-15t-61-41-42-61-15-75q0-27 7-51t21-48l569-990q10-16 10-35V128H640V0h768v128h-128v604q0 19 9 34l237 412q-30 12-57 28t-53 37l-237-412q-13-23-20-48t-7-51V128H896v604q0 52-28 100l-330 576h764q-22 64-22 128 0 76 28 144z" />
    </svg>
  ),
  displayName: 'TestUserSolidIcon',
});

export default TestUserSolidIcon;
