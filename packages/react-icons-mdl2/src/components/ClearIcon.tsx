import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClearIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1115 1024l914 915-90 90-915-914-915 914-90-90 914-915L19 109l90-90 915 914 915-914 90 90-914 915z" />
    </svg>
  ),
  displayName: 'ClearIcon',
});

export default ClearIcon;
