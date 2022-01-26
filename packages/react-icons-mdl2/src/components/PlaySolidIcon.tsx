import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlaySolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1024L512 1920V128l1280 896z" />
    </svg>
  ),
  displayName: 'PlaySolidIcon',
});

export default PlaySolidIcon;
