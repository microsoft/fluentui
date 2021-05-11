import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ClassNotebookLogo32Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1984 384v384q0 18-8 32 8 14 8 32v384q0 18-8 32 8 14 8 32v384q0 26-19 45t-45 19h-64q0 26-19 45t-45 19h-576v200L64 1791V263L1216 56v200h576q26 0 45 19t19 45h64q26 0 45 19t19 45zM897 1397V631l-144 8v514L467 655l-146 5v706l115 6V854l307 534 154 9zm1023 267v-384h-64v384h64zm0-448V832h-64v384h64zm0-448V384h-128v-64h-576v960h384v64h-384v128h384v64h-384v192h576V768h128zm-230-200v58l38 50-38 50v57l-50 29-29 50h-12v233l-97-85-93 85V862h-14l-29-50-50-29v-57l-36-50 36-50v-58l50-29 29-50h58l50-36 50 36h58l29 50 50 29zm-187 200q19 0 37-8t31-22 21-32 8-37q0-19-8-36t-21-31-31-20-37-8q-20 0-38 7t-31 21-22 30-8 37q0 19 8 37t21 31 32 22 38 9z" />
    </svg>
  ),
  displayName: 'ClassNotebookLogo32Icon',
});

export default ClassNotebookLogo32Icon;
