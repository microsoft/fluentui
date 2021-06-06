import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignHorizontalCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1664h-768v384H896v-384H128v-512h768V896H384V384h512V0h128v384h512v512h-512v256h768v512zM512 768h896V512H512v256zm1152 512H256v256h1408v-256z" />
    </svg>
  ),
  displayName: 'AlignHorizontalCenterIcon',
});

export default AlignHorizontalCenterIcon;
