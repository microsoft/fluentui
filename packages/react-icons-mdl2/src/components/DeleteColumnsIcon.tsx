import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeleteColumnsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 0h640v1092l-320 319-320-320V0zm1280 0v1024h-512V896h384V0h128zM128 896h384v128H0V0h128v896zm1149 606l-226 226 226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91z" />
    </svg>
  ),
  displayName: 'DeleteColumnsIcon',
});

export default DeleteColumnsIcon;
