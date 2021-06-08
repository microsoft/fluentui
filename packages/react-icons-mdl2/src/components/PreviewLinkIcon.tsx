import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PreviewLinkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v1536H0V256zm1920 1408V384H128v1280h1792zM1792 512v384H256V512h1536zm-128 256V640H384v128h1280zm-384 768v-512h512v512h-512zm128-384v256h256v-256h-256zm-384-128v128H256v-128h768zm0 384v128H256v-128h768z" />
    </svg>
  ),
  displayName: 'PreviewLinkIcon',
});

export default PreviewLinkIcon;
