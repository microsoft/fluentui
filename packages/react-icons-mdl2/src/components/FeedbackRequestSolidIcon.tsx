import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FeedbackRequestSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1408H704l-448 448v-448H0V128h2048zM1024 1280H896v128h128v-128zm8-169q0-37 7-70t36-62q39-39 77-74t68-75 49-85 19-105q0-68-26-127t-70-104-104-71-128-26q-68 0-127 26t-104 70-71 104-26 128h144q0-38 14-71t40-59 58-39 72-15q38 0 71 14t59 40 39 58 15 72q0 41-19 73t-47 61-62 60-61 66-48 81-19 107v64h144v-41z" />
    </svg>
  ),
  displayName: 'FeedbackRequestSolidIcon',
});

export default FeedbackRequestSolidIcon;
