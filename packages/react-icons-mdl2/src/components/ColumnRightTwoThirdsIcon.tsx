import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ColumnRightTwoThirdsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 256h1280v1536H768V256zm1152 1408V384H896v1280h1024zM0 1792V256h640v1536H0zM128 384v1280h384V384H128z" />
    </svg>
  ),
  displayName: 'ColumnRightTwoThirdsIcon',
});

export default ColumnRightTwoThirdsIcon;
