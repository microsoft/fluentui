import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ExpandMenuIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128h1792v640H128V128zm0 1664v-640h1792v640H128z" />
    </svg>
  ),
  displayName: 'ExpandMenuIcon',
});

export default ExpandMenuIcon;
