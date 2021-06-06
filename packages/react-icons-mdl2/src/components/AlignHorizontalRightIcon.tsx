import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignHorizontalRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v2048h-128V0h128zM512 384h1152v512H512V384zm128 384h896V512H640v256zM0 1152h1664v512H0v-512zm128 384h1408v-256H128v256z" />
    </svg>
  ),
  displayName: 'AlignHorizontalRightIcon',
});

export default AlignHorizontalRightIcon;
