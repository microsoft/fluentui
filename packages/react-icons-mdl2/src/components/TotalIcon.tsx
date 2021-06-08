import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TotalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 384h-128V256H475l768 768-768 768h1189v-128h128v256H256v-91l805-805-805-805v-91h1536v256z" />
    </svg>
  ),
  displayName: 'TotalIcon',
});

export default TotalIcon;
