import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FolderFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 64q26 0 45 19t19 45v992q0 57 20 93t44 67 44 67 20 93v480q0 26-19 45t-45 19H320V64h1344z" />
    </svg>
  ),
  displayName: 'FolderFillIcon',
});

export default FolderFillIcon;
