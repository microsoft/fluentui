import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AccountBrowserIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664H0V128h2048zM128 256v256h1792V256H128zm1792 1408V640H128v1024h1792zm-710-464q46 26 82 62t62 79 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100H640q0-52 14-101t39-93 62-80 83-62q-33-35-51-81t-19-95q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 49-18 95t-52 81zm-314-176q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50z" />
    </svg>
  ),
  displayName: 'AccountBrowserIcon',
});

export default AccountBrowserIcon;
