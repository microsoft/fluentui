import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const BingLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M877 697l851 298v437l-960 552-384-215V64l384 134v1350l541-311-266-124-166-416z" />
    </svg>
  ),
  displayName: 'BingLogoIcon',
});

export default BingLogoIcon;
