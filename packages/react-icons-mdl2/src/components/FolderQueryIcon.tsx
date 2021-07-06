import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FolderQueryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v640h-128V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1152h640v128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480zm672 768h768v640h-384v256H896v-640h384v-256zm256 640h-256v-256h-256v384h512v-128zm0-256h-128v128h128v-128zm-128-256v128h256v256h256v-384h-512z" />
    </svg>
  ),
  displayName: 'FolderQueryIcon',
});

export default FolderQueryIcon;
