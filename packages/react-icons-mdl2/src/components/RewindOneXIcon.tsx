import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RewindOneXIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 507L1664-5v1035l-640-517v517L380 510 1024-5v512zM896 762V261L584 511l312 251zm640 0V261l-312 250 312 251zm-678 390h38v896H796v-757q-19 17-44 33t-52 29-54 25-53 17v-102q30-8 67-23t73-34 69-41 56-43zm674 256h113l-215 324 211 316h-119q-38-64-77-127t-77-129h-2q-8 12-14 24t-15 25l-129 207h-118l218-314-208-326h119q38 67 76 133t75 136h2l160-269z" />
    </svg>
  ),
  displayName: 'RewindOneXIcon',
});

export default RewindOneXIcon;
