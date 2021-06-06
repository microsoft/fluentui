import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileCSSIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 549v1499H128V0h1115l549 549zm-512-37h293l-293-293v293zm384 1408V640h-512V128H256v1792h1408zM1472 896h64v896h-128v-256H987l-256 256H576l896-896zm-64 219l-293 293h293v-293zM384 256h128v128H384V256zm0 256h128v128H384V512zm0 256h128v128H384V768z" />
    </svg>
  ),
  displayName: 'FileCSSIcon',
});

export default FileCSSIcon;
