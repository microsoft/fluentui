import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlayReverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 128v1792L256 1024l1280-896zm-128 246l-929 650 929 650V374z" />
    </svg>
  ),
  displayName: 'PlayReverseIcon',
});

export default PlayReverseIcon;
