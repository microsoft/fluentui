import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HomeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 166l941 941-90 90-83-82v805h-512v-640H768v640H256v-805l-83 82-90-90 941-941z" />
    </svg>
  ),
  displayName: 'HomeSolidIcon',
});

export default HomeSolidIcon;
