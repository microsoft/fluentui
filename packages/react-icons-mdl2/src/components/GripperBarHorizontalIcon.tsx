import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GripperBarHorizontalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 768h2048v128H0V768zm0 512v-128h2048v128H0z" />
    </svg>
  ),
  displayName: 'GripperBarHorizontalIcon',
});

export default GripperBarHorizontalIcon;
