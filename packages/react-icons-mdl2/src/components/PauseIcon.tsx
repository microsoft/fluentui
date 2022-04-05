import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PauseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 256h128v1536H640V256zm768 0v1536h-128V256h128z" />
    </svg>
  ),
  displayName: 'PauseIcon',
});

export default PauseIcon;
