import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FastForwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 379l806 645-806 650V379zm128 266v762l474-383-474-379zM256 1674V379l806 645-806 650zM384 645v762l474-383-474-379z" />
    </svg>
  ),
  displayName: 'FastForwardIcon',
});

export default FastForwardIcon;
