import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GridViewLargeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 128v1664H128V128h1664zm-128 128H256v1408h1408V256z" />
    </svg>
  ),
  displayName: 'GridViewLargeIcon',
});

export default GridViewLargeIcon;
