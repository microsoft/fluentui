import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ColumnLeftTwoThirdsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1792V256h1280v1536H0zM128 384v1280h1024V384H128zm1280-128h640v1536h-640V256zm512 1408V384h-384v1280h384z" />
    </svg>
  ),
  displayName: 'ColumnLeftTwoThirdsIcon',
});

export default ColumnLeftTwoThirdsIcon;
