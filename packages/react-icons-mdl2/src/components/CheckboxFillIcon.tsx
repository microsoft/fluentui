import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckboxFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048z" />
    </svg>
  ),
  displayName: 'CheckboxFillIcon',
});

export default CheckboxFillIcon;
