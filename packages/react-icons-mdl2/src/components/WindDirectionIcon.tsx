import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WindDirectionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0l683 2048-683-683-683 683L1024 0z" />
    </svg>
  ),
  displayName: 'WindDirectionIcon',
});

export default WindDirectionIcon;
