import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0h1024v1024h-128V219L93 2045l-90-90L1829 128h-805V0z" />
    </svg>
  ),
  displayName: 'GoIcon',
});

export default GoIcon;
