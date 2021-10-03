import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AssetLibraryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v640h-128V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1152h768v128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480zm416 768h1024v896H1024v-896zm128 128v128h128v128h-128v128h128v128h-128v128h768v-128h-128v-128h128v-128h-128v-128h128v-128h-768zm-123-295q-17-41-53-65t-80-24v448q0 44-19 79t-52 61-72 38-81 14q-41 0-81-13t-72-39-51-60-20-80q0-44 19-79t52-61 72-38 81-14q51 0 96 18V768h128q41 0 79 12t72 34 58 53 42 69l-118 49zm-357 423q13 0 29-4t32-12 25-20 10-28q0-16-10-28t-25-20-31-12-30-4q-13 0-29 4t-32 12-25 20-10 28q0 16 10 28t25 20 31 12 30 4z" />
    </svg>
  ),
  displayName: 'AssetLibraryIcon',
});

export default AssetLibraryIcon;
