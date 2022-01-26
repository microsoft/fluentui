import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BitbucketLogo32Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1981 64q28 0 47 19t20 47q0 7-1 11l-278 1723q-4 25-22 40t-44 16H367q-32 0-57-21t-31-54L1 141q-1-4-1-12 0-28 19-46t48-19h1914zm-638 624H697l116 608h426l104-608z" />
    </svg>
  ),
  displayName: 'BitbucketLogo32Icon',
});

export default BitbucketLogo32Icon;
