import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GoMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1027 0H3v1024h128V219l1827 1826 90-90L222 128h805V0z" />
    </svg>
  ),
  displayName: 'GoMirroredIcon',
});

export default GoMirroredIcon;
