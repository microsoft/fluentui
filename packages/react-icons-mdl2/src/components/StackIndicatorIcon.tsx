import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StackIndicatorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1707 853h341v1024H683v-341H341v-341H0V171h1365v341h342v341zM171 341v683h1024V341H171zm341 854v170h1024V683h-171v512H512zm1365 512v-683h-170v512H853v171h1024z" />
    </svg>
  ),
  displayName: 'StackIndicatorIcon',
});

export default StackIndicatorIcon;
