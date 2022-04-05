import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleExclamationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1408h128v128H896v-128zm128-768v640H896V640h128z" />
    </svg>
  ),
  displayName: 'StatusCircleExclamationIcon',
});

export default StatusCircleExclamationIcon;
