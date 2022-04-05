import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FieldEmptyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1408H0V256h2048zm-128 128H128v1152h1792V384z" />
    </svg>
  ),
  displayName: 'FieldEmptyIcon',
});

export default FieldEmptyIcon;
