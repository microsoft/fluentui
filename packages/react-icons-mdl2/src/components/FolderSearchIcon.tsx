import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FolderSearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v603q-58-52-128-83V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1152h963l-128 128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480zm1120 640q66 0 124 25t101 69 69 102 26 124q0 66-25 124t-69 102-102 69-124 25q-47 0-92-13t-84-40l-419 418q-19 19-45 19t-45-19-19-45q0-26 19-45l418-419q-26-39-39-84t-14-92q0-66 25-124t68-101 102-69 125-26zm0 512q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15z" />
    </svg>
  ),
  displayName: 'FolderSearchIcon',
});

export default FolderSearchIcon;
