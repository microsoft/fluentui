import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WhiteBoardApp32Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1254 674l539-537 119 119-359 359q-26 26-47 48t-41 44-41 42-50 45l-216 101 96-221zm666-246v1236H128V320h1300l-129 128H256v319q27-14 60-30t68-29 71-23 67-9q44 0 73 25t30 71q0 27-8 51t-22 48-28 47-29 48-21 52-9 58q0 32 11 58t30 44 45 29 58 10q54 0 105-26t97-65 83-87 63-89l109 68q-36 59-84 117t-107 105-125 76-141 29q-58 0-108-20t-86-56-57-85-21-108q0-45 9-78t23-64 33-59 38-66q-60 17-116 45t-111 59v623h1536V556l128-128z" />
    </svg>
  ),
  displayName: 'WhiteBoardApp32Icon',
});

export default WhiteBoardApp32Icon;
