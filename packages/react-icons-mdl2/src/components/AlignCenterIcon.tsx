import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v128H0V128zm256 384h1536v128H256V512zm0 768h1536v128H256v-128zM0 1792v-128h2048v128H0zm0-768V896h2048v128H0z" />
    </svg>
  ),
  displayName: 'AlignCenterIcon',
});

export default AlignCenterIcon;
