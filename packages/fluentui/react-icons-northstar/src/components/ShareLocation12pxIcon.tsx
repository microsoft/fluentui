import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShareLocation12pxIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path d="M20,18H18a4,4,0,0,0-4-4V12a6,6,0,0,1,6,6" fillRule="evenodd" />
      <path d="M23,18H21a7,7,0,0,0-7-7V9a9,9,0,0,1,9,9" fillRule="evenodd" />
      <path
        d="M10,18.5h0A3.5,3.5,0,1,0,13.5,15,3.5,3.5,0,0,0,10,18.5Zm3.5,1.17a1.17,1.17,0,1,1,1.17-1.17,1.17,1.17,0,0,1-1.17,1.17"
        fillRule="evenodd"
      />
    </svg>
  ),
  displayName: 'ShareLocation12pxIcon',
});

export default ShareLocation12pxIcon;
