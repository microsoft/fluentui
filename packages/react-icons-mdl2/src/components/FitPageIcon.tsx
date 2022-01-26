import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FitPageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 896V640h-256V512h384v384h-128zM384 640v256H256V512h384v128H384zm1408 512v384h-384v-128h256v-256h128zM640 1408v128H256v-384h128v256h256zM0 256h2048v1536H0V256zm1920 1408V384H128v1280h1792z" />
    </svg>
  ),
  displayName: 'FitPageIcon',
});

export default FitPageIcon;
