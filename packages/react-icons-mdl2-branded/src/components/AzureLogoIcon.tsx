import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AzureLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1197 343l851 1475H467l968-171-497-592 259-712zm-68-113L470 1644H0l521-903 608-511z" />
    </svg>
  ),
  displayName: 'AzureLogoIcon',
});

export default AzureLogoIcon;
