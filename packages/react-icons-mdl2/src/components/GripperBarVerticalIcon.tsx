import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GripperBarVerticalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 2048V0h128v2048H768zM1152 0h128v2048h-128V0z" />
    </svg>
  ),
  displayName: 'GripperBarVerticalIcon',
});

export default GripperBarVerticalIcon;
