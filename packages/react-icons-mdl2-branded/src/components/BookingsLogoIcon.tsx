import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const BookingsLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M960 1280q-133 0-249-50t-204-137-137-203-50-250V0h640v1280zm128-640q133 0 249 50t204 137 137 203 50 250h-640V640zm-768 768h1408q0 133-50 249t-137 204-203 137-250 50H320v-640z" />
    </svg>
  ),
  displayName: 'BookingsLogoIcon',
});

export default BookingsLogoIcon;
