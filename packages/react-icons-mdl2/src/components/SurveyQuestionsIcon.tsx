import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SurveyQuestionsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1663h128v128H896v-128zm64-960q66 0 124 25t101 69 69 102 26 124q0 60-19 105t-47 80-62 65-61 60-48 63-19 75v64H896v-64q0-60 19-104t47-80 62-66 61-59 48-63 19-76q0-39-15-74t-41-61-62-42-74-15q-39 0-74 15t-61 41-42 62-15 74H640q0-66 25-124t68-101 102-69 125-26zm832-154v1499H128V0h1120l544 549zm-507-37h290l-290-292v292zm379 1408V640h-507V128H256v1792h1408z" />
    </svg>
  ),
  displayName: 'SurveyQuestionsIcon',
});

export default SurveyQuestionsIcon;
