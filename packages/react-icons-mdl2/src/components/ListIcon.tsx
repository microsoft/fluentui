import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1536v-128h1280v128H0zm0-640h2048v128H0V896zm1664-512v128H0V384h1664z" />
    </svg>
  ),
  displayName: 'ListIcon',
});

export default ListIcon;
