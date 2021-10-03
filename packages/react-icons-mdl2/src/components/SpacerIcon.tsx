import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SpacerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M659 1261l90-90 147 146v-293h128v293l147-146 90 90-301 301-301-301zm237-365V603L749 749l-90-90 301-301 301 301-90 90-147-146v293H896zm1024-768v128H0V128h1920zM0 1664h1920v128H0v-128z" />
    </svg>
  ),
  displayName: 'SpacerIcon',
});

export default SpacerIcon;
