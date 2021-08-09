import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InsertTextBoxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 388v1524H268v-384h116v268h1548V504h-780V388h896zM374 1272H0v-44q19-3 38-5t37-8q14-4 30-26t32-49 27-53 19-41l388-918h82l382 928q9 22 21 50t29 53 38 44 49 22q28 3 56 3v44H782v-44h37q20 0 37-3t30-16 12-37q0-22-11-60t-26-80-30-79-26-62H359q-9 23-26 61t-34 80-29 79-13 60q0 24 12 35t30 16 38 4 37 2v44zm28-509h344L570 385 402 763z" />
    </svg>
  ),
  displayName: 'InsertTextBoxIcon',
});

export default InsertTextBoxIcon;
