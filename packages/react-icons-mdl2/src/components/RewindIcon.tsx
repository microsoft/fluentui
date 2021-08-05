import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RewindIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1674L90 1024l806-645v1295zm-128-267V645l-474 379 474 383zm218-383l806-645v1295l-806-650zm678 383V645l-474 379 474 383z" />
    </svg>
  ),
  displayName: 'RewindIcon',
});

export default RewindIcon;
