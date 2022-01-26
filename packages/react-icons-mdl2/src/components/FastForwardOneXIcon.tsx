import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FastForwardOneXIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1668 510l-644 520V513l-640 517V-5l640 512V-5l644 515zM512 762l312-251-312-250v501zm640-501v501l312-251-312-250zm-294 891h38v896H796v-757q-19 17-44 33t-52 29-54 25-53 17v-102q30-8 67-23t73-34 69-41 56-43zm674 256h113l-215 324 211 316h-119q-38-64-77-127t-77-129h-2q-8 12-14 24t-15 25l-129 207h-118l218-314-208-326h119q38 67 76 133t75 136h2l160-269z" />
    </svg>
  ),
  displayName: 'FastForwardOneXIcon',
});

export default FastForwardOneXIcon;
