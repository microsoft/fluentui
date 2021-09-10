import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckboxCompositeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048zm-128 128H128v1792h1792V128zM768 1627l-429-430 90-90 339 338 851-850 90 90-941 942z" />
    </svg>
  ),
  displayName: 'CheckboxCompositeIcon',
});

export default CheckboxCompositeIcon;
