import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckboxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048zm-128 128H128v1792h1792V128z" />
    </svg>
  ),
  displayName: 'CheckboxIcon',
});

export default CheckboxIcon;
