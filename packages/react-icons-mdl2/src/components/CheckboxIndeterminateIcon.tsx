import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckboxIndeterminateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 512v1024H512V512h1024z" />
    </svg>
  ),
  displayName: 'CheckboxIndeterminateIcon',
});

export default CheckboxIndeterminateIcon;
