import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VisioDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 475v1445q0 27-10 50t-27 40-41 28-50 10H640q-27 0-50-10t-40-27-28-41-10-50v-256H115q-24 0-44-9t-37-25-25-36-9-45V627q0-24 9-44t25-37 36-25 45-9h397V128q0-27 10-50t27-40 41-28 50-10h933q26 0 49 9t42 28l347 347q18 18 27 41t10 50zm-384-256v165h165l-165-165zM493 1424h163l255-672H745l-147 427q-5 16-10 31t-11 31q-41-123-82-244t-84-245H241l248 662 4 10zm147 496h1280V512h-256q-27 0-50-10t-40-27-28-41-10-50V128H640v384h397q24 0 44 9t37 25 25 36 9 45v922q0 24-9 44t-25 37-36 25-45 9H640v256zm960-1280l192 192-128 128v448h-256v128h-128v-384h128v128h128V960l-128-128 192-192z" />
    </svg>
  ),
  displayName: 'VisioDocumentIcon',
});

export default VisioDocumentIcon;
