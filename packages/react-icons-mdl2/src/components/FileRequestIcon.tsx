import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileRequestIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512v896h-128V512h-704q-56 0-90 9t-58 24-41 31-37 31-50 23-76 10H128v896h896v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h704q27 0 50 10t40 27 28 41 10 50zm-1184 0q27 0 45-9t35-22 34-28 39-28q-15-17-31-45t-36-56-40-48-46-20H128v256h736zm1184 1280q0 53-20 99t-55 82-81 55-100 20v-128q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-293l162 163-90 90-317-317 317-317 90 90-162 163h293q53 0 99 20t82 55 55 81 20 100z" />
    </svg>
  ),
  displayName: 'FileRequestIcon',
});

export default FileRequestIcon;
