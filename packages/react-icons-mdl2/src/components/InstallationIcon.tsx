import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InstallationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1664h128v384H128v-384h128v256h1408v-256zm-147-531l-557 557-557-557 90-90 403 402V128h128v1317l403-402 90 90z" />
    </svg>
  ),
  displayName: 'InstallationIcon',
});

export default InstallationIcon;
