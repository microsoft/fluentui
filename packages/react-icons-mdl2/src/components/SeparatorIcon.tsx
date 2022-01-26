import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SeparatorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 128v1792H896V128h128z" />
    </svg>
  ),
  displayName: 'SeparatorIcon',
});

export default SeparatorIcon;
