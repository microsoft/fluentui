import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckboxCompositeReversedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048zm-339 685l-90-90-851 850-339-338-90 90 429 430 941-942z" />
    </svg>
  ),
  displayName: 'CheckboxCompositeReversedIcon',
});

export default CheckboxCompositeReversedIcon;
