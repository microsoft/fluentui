import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageListFilterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 1280h896v152l-256 288v328h-384v-328l-256-288v-152zm512 392l234-264h-596l234 264v248h128v-248zM1280 384v128H512V384h768zm-768 896v-128h512v128H512zm-384 384h1059l93 105v23H0V0h1536v1152h-128V128H128v1536zm1152-896v128H512V768h768zM384 384v128H256V384h128zm0 384v128H256V768h128zm-128 512v-128h128v128H256z" />
    </svg>
  ),
  displayName: 'PageListFilterIcon',
});

export default PageListFilterIcon;
