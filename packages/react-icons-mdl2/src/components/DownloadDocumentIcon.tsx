import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DownloadDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h1024v128H128V0h1115l549 549v347h-128V640h-512V128H256v1792zM1280 512h293l-293-293v293zm512 1061l163-162 90 90-317 317-317-317 90-90 163 162v-549h128v549zm256 347v128h-640v-128h640z" />
    </svg>
  ),
  displayName: 'DownloadDocumentIcon',
});

export default DownloadDocumentIcon;
