import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WordDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 475v1445q0 27-10 50t-27 40-41 28-50 10H640q-27 0-50-10t-40-27-28-41-10-50v-256H115q-24 0-44-9t-37-25-25-36-9-45V627q0-24 9-44t25-37 36-25 45-9h397V128q0-27 10-50t27-40 41-28 50-10h933q26 0 49 9t42 28l347 347q18 18 27 41t10 50zm-384-256v165h165l-165-165zM320 1424h161q2-8 9-43t18-83 21-103 22-101 16-76 8-31l7 30q7 30 17 77t23 100 23 103 19 84 10 43h160l148-672H834l-80 438-100-438H502l-96 440-86-440H170l150 672zm320 496h1280V512h-256q-27 0-50-10t-40-27-28-41-10-50V128H640v384h397q24 0 44 9t37 25 25 36 9 45v922q0 24-9 44t-25 37-36 25-45 9H640v256zm640-1024V768h512v128h-512zm0 256v-128h512v128h-512zm0 256v-128h512v128h-512z" />
    </svg>
  ),
  displayName: 'WordDocumentIcon',
});

export default WordDocumentIcon;
