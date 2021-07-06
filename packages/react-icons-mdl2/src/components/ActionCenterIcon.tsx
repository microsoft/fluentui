import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ActionCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h2048v1664h-640l-384 384-384-384H0V0zm1920 1536V128H128v1408h565l331 331 331-331h565z" />
    </svg>
  ),
  displayName: 'ActionCenterIcon',
});

export default ActionCenterIcon;
