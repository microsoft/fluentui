import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AcceptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1755L19 1133l90-90 531 530L1939 275l90 90L640 1755z" />
    </svg>
  ),
  displayName: 'AcceptIcon',
});

export default AcceptIcon;
