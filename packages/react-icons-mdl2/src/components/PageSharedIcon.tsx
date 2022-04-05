import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageSharedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1850 1712q46 25 82 61t62 80 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100h-128q0-52 14-101t39-94 62-80 83-61q-33-35-51-81t-19-95q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 49-18 95t-52 81zm-314-176q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50zm-384-896V128H256v1792h880q-8 32-12 64t-4 64H128V0h1115l549 549v591q-63-20-128-20V640h-512zm128-128h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'PageSharedIcon',
});

export default PageSharedIcon;
