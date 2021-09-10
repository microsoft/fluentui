import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleBlock2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1024v128H512v-128h896z" />
    </svg>
  ),
  displayName: 'StatusCircleBlock2Icon',
});

export default StatusCircleBlock2Icon;
