import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BreadcrumbIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 512h1536v128H256V512zm384 512V896h1152v128H640zm384 384v-128h768v128h-768z" />
    </svg>
  ),
  displayName: 'BreadcrumbIcon',
});

export default BreadcrumbIcon;
