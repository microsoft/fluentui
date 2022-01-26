import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FreezingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1288q61 63 94 143t34 169q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-88 33-168t95-144V320q0-66 25-124t68-101 102-69 125-26q66 0 124 25t101 69 69 102 26 124v968zm-320 632q66 0 124-25t101-68 69-102 26-125q0-83-34-143t-94-113V320q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v1024q-60 53-94 113t-34 143q0 66 25 124t68 102 102 69 125 25zm64-501q29 10 52 28t41 42 26 52 9 59q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-30 9-58t26-53 40-42 53-28v-395h128v395zM1024 384l-128 768-86-516-138 644-142-664-82 408-93-466-99 594-128-768h896z" />
    </svg>
  ),
  displayName: 'FreezingIcon',
});

export default FreezingIcon;
