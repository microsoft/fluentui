import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AccountActivityIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256v1792H256V256h512q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100h512zM640 384v128h768V384h-256V256q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128H640zm1024 0h-128v256H512V384H384v1536h1280V384zm-405 335q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-526 531-358 68 75-351 526-530q28-28 65-42t76-15zm51 249q21-23 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-499 503-27 126 129-25 498-502z" />
    </svg>
  ),
  displayName: 'AccountActivityIcon',
});

export default AccountActivityIcon;
