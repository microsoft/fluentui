import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PostUpdateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 384h1408v1152H640V384zm1280 1024V512H768v896h1152zM128 1024V896h384v128H128zM0 768V640h512v128H0zm256 512v-128h256v128H256zm1536-640v128H896V640h896zm-384 640V896h384v384h-384zm128-256v128h128v-128h-128zm-256 128v128H896v-128h384zm0-256v128H896V896h384z" />
    </svg>
  ),
  displayName: 'PostUpdateIcon',
});

export default PostUpdateIcon;
