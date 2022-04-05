import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FastForwardTwoXIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1668 510l-644 520V513l-640 517V-5l640 512V-5l644 515zM512 762l312-251-312-250v501zm640-501v501l312-251-312-250zM562 1958h439v90H457v-44q0-25 2-50t10-49q15-55 50-96t79-77 91-68 86-71 64-85 25-110q0-75-43-118t-119-43q-30 0-59 8t-57 24-51 34-44 42v-108q47-47 102-66t121-19q54 0 100 16t81 46 53 74 19 101q0 83-30 141t-75 102-97 78-98 71-75 77-30 100zm970-550h113l-215 324 211 316h-119q-38-64-77-127t-77-129h-2q-8 12-14 24t-15 25l-129 207h-118l218-314-208-326h119q38 67 76 133t75 136h2l160-269z" />
    </svg>
  ),
  displayName: 'FastForwardTwoXIcon',
});

export default FastForwardTwoXIcon;
