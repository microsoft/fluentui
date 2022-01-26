import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleQuestionMarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1536h128v128H896v-128zm64-960q66 0 124 25t101 69 69 102 26 124q0 60-19 104t-47 81-62 65-61 59-48 63-19 76v64H896v-64q0-60 19-104t47-81 62-65 61-59 48-63 19-76q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75H640q0-66 25-124t68-101 102-69 125-26z" />
    </svg>
  ),
  displayName: 'StatusCircleQuestionMarkIcon',
});

export default StatusCircleQuestionMarkIcon;
