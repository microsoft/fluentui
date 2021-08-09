import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BuildIssueIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1905 1418l143 157v217h-128v-167l-101-112q-36 20-77 22l-78 89v168h-128v-216l72-82q-5-3-8-6t-8-8l-248-249-192 193v496h128v128H640v-128h128v-576q0-38 14-73t42-63l384-384q27-27 62-41t74-15q38 0 73 14t63 42l384 384q27 27 41 62t15 74q0 40-15 74zm-862-247q61 29 90 90l256-256q19-19 19-45t-19-45-45-19q-26 0-45 19l-256 256zm-147 749h128v-576q0-26-19-45t-45-19q-26 0-45 19t-19 45v576zm832-512q26 0 45-19t19-45q0-26-19-45l-256-256q-14 31-36 52t-47 46l249 248q19 19 45 19zm-1088 0v128H128V128h1152v512h-128V256H256v1152h384zm128-896v384H640V512h128zm-128 640v-128h128v128H640z" />
    </svg>
  ),
  displayName: 'BuildIssueIcon',
});

export default BuildIssueIcon;
