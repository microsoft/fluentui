import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageLockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 640V128H256v1792h896v128H128V0h1115l549 549v337q-31-10-63-16t-65-6V640h-512zm128-128h293l-293-293v293zm768 896v640h-768v-640h128v-128q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100v128h128zm-512 0h256v-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128zm384 128h-512v384h512v-384z" />
    </svg>
  ),
  displayName: 'PageLockIcon',
});

export default PageLockIcon;
