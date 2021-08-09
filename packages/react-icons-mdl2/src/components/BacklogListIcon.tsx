import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BacklogListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128h1792v512H128V128zm1664 384V256H256v256h1536zM512 1280V768h1408v512H512zm128-384v256h1152V896H640zM128 1920v-512h1792v512H128zm128-384v256h1536v-256H256z" />
    </svg>
  ),
  displayName: 'BacklogListIcon',
});

export default BacklogListIcon;
