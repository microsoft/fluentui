import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScaleUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1536V512h1536v1024H256zm128-896v768h1280V640H384zm1280-384h384v384h-128V384h-256V256zM128 384v256H0V256h384v128H128zm1792 1280v-256h128v384h-384v-128h256zM128 1408v256h256v128H0v-384h128z" />
    </svg>
  ),
  displayName: 'ScaleUpIcon',
});

export default ScaleUpIcon;
