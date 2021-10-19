import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BucketColorFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M192 1088h1280l-640 640-640-640zm1731 534q32 56 32 122 0 47-16 90t-47 76-71 54-89 20q-49 0-92-18t-75-50-51-75-19-92q0-62 31-116l202-353 195 342z" />
    </svg>
  ),
  displayName: 'BucketColorFillIcon',
});

export default BucketColorFillIcon;
