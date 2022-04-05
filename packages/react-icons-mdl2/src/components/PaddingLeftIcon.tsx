import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PaddingLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1920h-128V0h128zM0 0h128v128H0V0zm0 1792h128v128H0v-128zM0 256h128v256H0V256zm0 384h128v256H0V640zm0 384h128v256H0v-256zm0 384h128v256H0v-256zm603-512h1061v128H603l210 211-90 90-365-365 365-365 90 90-210 211z" />
    </svg>
  ),
  displayName: 'PaddingLeftIcon',
});

export default PaddingLeftIcon;
