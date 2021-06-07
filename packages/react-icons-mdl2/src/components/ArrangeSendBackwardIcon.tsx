import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrangeSendBackwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1536h512v128H0V0h1664v640h-128V128H128v1408zm1920-768v1280H768V768h1280zm-128 128H896v1024h1024V896z" />
    </svg>
  ),
  displayName: 'ArrangeSendBackwardIcon',
});

export default ArrangeSendBackwardIcon;
