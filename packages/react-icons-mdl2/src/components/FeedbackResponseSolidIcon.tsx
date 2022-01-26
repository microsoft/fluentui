import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FeedbackResponseSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1408H704l-448 448v-448H0V128h2048zm-421 429l-136-136-659 659-275-275-136 136 411 411 795-795z" />
    </svg>
  ),
  displayName: 'FeedbackResponseSolidIcon',
});

export default FeedbackResponseSolidIcon;
