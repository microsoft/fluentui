import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SkiResortsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 640l574 1152H0L768 256l447 897 257-513zm0 287l-185 369 47 95 111-111h203l-176-353zM898 803L768 543 638 803l130 130 130-130zm-691 861h1121L958 924l-190 191-191-191-370 740zm1263 0h369l-127-256h-213l-104 104 75 152z" />
    </svg>
  ),
  displayName: 'SkiResortsIcon',
});

export default SkiResortsIcon;
