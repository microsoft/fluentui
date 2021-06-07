import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CollapseMenuIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 768V640h1792v128H128zm0-640h1792v128H128V128zm0 1152v-128h1792v128H128zm0 512v-128h1792v128H128z" />
    </svg>
  ),
  displayName: 'CollapseMenuIcon',
});

export default CollapseMenuIcon;
