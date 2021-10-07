import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublicFolderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1725 1283l317 317-317 317-90-90 163-163h-668l163 163-90 90-317-317 317-317 90 90-163 163h668l-163-163 90-90zM608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v1024l-128-128V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1024h640v128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480z" />
    </svg>
  ),
  displayName: 'PublicFolderIcon',
});

export default PublicFolderIcon;
