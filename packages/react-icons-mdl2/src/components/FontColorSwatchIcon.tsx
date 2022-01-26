import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontColorSwatchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1792v256H256v-256h1408z" />
    </svg>
  ),
  displayName: 'FontColorSwatchIcon',
});

export default FontColorSwatchIcon;
