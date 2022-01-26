import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontColorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h1408v128H256v-128zm387-640l-170 512H338L893 128h135l554 1664h-135l-171-512H643zm317-949l-274 821h548L960 331z" />
    </svg>
  ),
  displayName: 'FontColorIcon',
});

export default FontColorIcon;
