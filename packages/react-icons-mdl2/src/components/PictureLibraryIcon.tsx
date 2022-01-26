import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PictureLibraryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v512h-128V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1152h384v128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480zm32 640h1408v1024H640V1024zm128 896h805l-485-486-320 321v165zm987 0h139l-230-230-69 70 160 160zm-987-768v421l320-319 416 416 160-160 256 256v-614H768zm960 256q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'PictureLibraryIcon',
});

export default PictureLibraryIcon;
