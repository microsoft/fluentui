import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RewindFourXIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 507L1664-5v1035l-640-517v517L380 510 1024-5v512zM896 762V261L584 511l312 251zm640 0V261l-312 250 312 251zm-627 390v592h115v93H909v211H808v-211H387v-88q59-66 116-137t111-147 101-153 85-160h109zm-101 592v-439q-66 118-143 225t-163 214h306zm724-336h113l-215 324 211 316h-119q-38-64-77-127t-77-129h-2q-8 12-14 24t-15 25l-129 207h-118l218-314-208-326h119q38 67 76 133t75 136h2l160-269z" />
    </svg>
  ),
  displayName: 'RewindFourXIcon',
});

export default RewindFourXIcon;
