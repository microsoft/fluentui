import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileCodeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 549v1499H128V0h1115l549 549zm-512-37h293l-293-293v293zm384 1408V640h-512V128H256v1792h1408zM749 941l-211 211 211 211-90 90-301-301 301-301 90 90zm512-90l301 301-301 301-90-90 211-211-211-211 90-90z" />
    </svg>
  ),
  displayName: 'FileCodeIcon',
});

export default FileCodeIcon;
