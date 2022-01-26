import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignVerticalTopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v128H0V0h2048zm-896 256h512v1152h-512V256zm128 1024h256V384h-256v896zM384 256h512v1664H384V256zm128 1536h256V384H512v1408z" />
    </svg>
  ),
  displayName: 'AlignVerticalTopIcon',
});

export default AlignVerticalTopIcon;
