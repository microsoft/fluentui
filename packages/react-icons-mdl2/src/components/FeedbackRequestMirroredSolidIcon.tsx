import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FeedbackRequestMirroredSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1408H704l-448 448v-448H0V128h2048zM1024 1280H896v128h128v-128zm264-640q0-68-26-127t-70-104-104-71-128-26q-68 0-127 26t-104 70-71 104-26 128q0 61 19 106t47 82 62 66 61 59 48 62 19 73v64h144v-64q0-61-19-106t-47-82-62-66-61-59-48-62-19-73q0-38 14-71t40-59 58-39 72-15q38 0 71 14t59 40 39 58 15 72h144z" />
    </svg>
  ),
  displayName: 'FeedbackRequestMirroredSolidIcon',
});

export default FeedbackRequestMirroredSolidIcon;
