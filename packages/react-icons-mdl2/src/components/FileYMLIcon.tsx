import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileYMLIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 128v1792h1024v128H128V0h1115l549 549v731h-128V640h-512V128H256zm1024 91v293h293l-293-293zm468 1189h112l-210 408v232h-106v-230l-204-410h121l126 274q4 9 7 19t6 19h1q6-21 15-38l132-274zm236 256q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zm0 128q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
    </svg>
  ),
  displayName: 'FileYMLIcon',
});

export default FileYMLIcon;
