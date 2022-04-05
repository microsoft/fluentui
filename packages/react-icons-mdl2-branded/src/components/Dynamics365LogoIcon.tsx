import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const Dynamics365LogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M876 914L512 1960V675l364 239zm788-195v594L512 1960 1664 719zm-400 240L512 591V90l1101 585-349 284z" />
    </svg>
  ),
  displayName: 'Dynamics365LogoIcon',
});

export default Dynamics365LogoIcon;
