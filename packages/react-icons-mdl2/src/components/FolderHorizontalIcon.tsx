import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FolderHorizontalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 256q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v1280H0V384q0-27 10-50t27-40 41-28 50-10h480zM128 384v128h480q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128zm1792 128H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1024h1792V512z" />
    </svg>
  ),
  displayName: 'FolderHorizontalIcon',
});

export default FolderHorizontalIcon;
