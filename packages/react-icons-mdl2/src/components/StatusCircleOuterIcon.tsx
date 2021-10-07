import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleOuterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 128q132 0 254 34t230 97 194 150 150 195 97 229 35 255q0 132-34 254t-97 230-150 194-195 150-229 97-255 35q-132 0-254-34t-230-97-194-150-150-195-97-229-35-255q0-132 34-254t97-230 150-194 195-150 229-97 255-35z" />
    </svg>
  ),
  displayName: 'StatusCircleOuterIcon',
});

export default StatusCircleOuterIcon;
