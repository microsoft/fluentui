import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const StaffNotebookLogo32Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1984 384v384q0 16-8 32 8 16 8 32v384q0 16-8 32 8 16 8 32v384q0 22-8 34t-22 19-30 9-34 2h-34q0 26-19 45t-45 19h-576v200L64 1791V263L1216 56v200h576q26 0 45 19t19 45h34q17 0 33 2t30 8 22 19 9 35zM897 1397V631l-145 8v257q0 128 1 257L467 655l-146 5v706l115 6V854l307 534 154 9zm1023 267v-384h-64v384h64zm0-448V832h-64v384h64zm0-448V384h-128v-64h-576v397l192-77 320 128-64 26v198q0 14-9 23t-23 9q-14 0-23-9t-9-23V819l-192 77-192-77v461h384v64h-384v128h384v64h-384v192h576V768h128zm-640 163l128 51 128-51v93q0 19-15 31t-36 19-42 11-35 3q-13 0-34-3t-43-10-36-20-15-31v-93z" />
    </svg>
  ),
  displayName: 'StaffNotebookLogo32Icon',
});

export default StaffNotebookLogo32Icon;
