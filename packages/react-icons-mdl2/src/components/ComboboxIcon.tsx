import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ComboboxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1408H0V256h2048zm-128 128H128v1152h1792V384zm-384 768l-256-256h512l-256 256zM512 1024H256V896h256v128zm512 0H768V896h256v128z" />
    </svg>
  ),
  displayName: 'ComboboxIcon',
});

export default ComboboxIcon;
