import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ExcelDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 475v1445q0 27-10 50t-27 40-41 28-50 10H640q-27 0-50-10t-40-27-28-41-10-50v-256H115q-24 0-44-9t-37-25-25-36-9-45V627q0-24 9-44t25-37 36-25 45-9h397V128q0-27 10-50t27-40 41-28 50-10h933q26 0 49 9t42 28l347 347q18 18 27 41t10 50zm-384-256v165h165l-165-165zM261 1424h189q2-4 12-23t25-45 29-55 29-53 23-41 10-17q27 59 60 118t65 116h187l-209-339 205-333H707q-31 57-60 114t-63 112q-29-57-57-113t-57-113H279l199 335-217 337zm379 496h1280V512h-256q-27 0-50-10t-40-27-28-41-10-50V128H640v384h397q24 0 44 9t37 25 25 36 9 45v922q0 24-9 44t-25 37-36 25-45 9H640v256zm640-1024V768h512v128h-512zm0 256v-128h512v128h-512zm0 256v-128h512v128h-512z" />
    </svg>
  ),
  displayName: 'ExcelDocumentIcon',
});

export default ExcelDocumentIcon;
