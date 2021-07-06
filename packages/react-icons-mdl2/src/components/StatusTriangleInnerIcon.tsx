import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusTriangleInnerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1920H256L960 512l704 1408z" />
    </svg>
  ),
  displayName: 'StatusTriangleInnerIcon',
});

export default StatusTriangleInnerIcon;
