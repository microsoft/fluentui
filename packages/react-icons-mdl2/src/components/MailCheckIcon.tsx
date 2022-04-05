import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailCheckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1939 1363l90 90-557 558-269-270 90-90 179 178 467-466zm109-979v907q-32-32-65-63t-63-66V648l-896 447-896-447v888h1099l-128 128H0V384h2048zM1024 953l881-441H143l881 441z" />
    </svg>
  ),
  displayName: 'MailCheckIcon',
});

export default MailCheckIcon;
