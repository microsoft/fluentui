import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CRMReportIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 1536h-384V384h384v1152zM1280 512v896h128V512h-128zm-256 1024H640V640h384v896zM768 768v640h128V768H768zM128 0h1792v1920H128v-384H0v-128h128V640H0V512h128V0zm1664 1792V128H256v384h128v128H256v768h128v128H256v256h1536z" />
    </svg>
  ),
  displayName: 'CRMReportIcon',
});

export default CRMReportIcon;
