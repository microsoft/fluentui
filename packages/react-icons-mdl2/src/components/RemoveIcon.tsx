import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1088H0V960h2048v128z" />
    </svg>
  ),
  displayName: 'RemoveIcon',
});

export default RemoveIcon;
