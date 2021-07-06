import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileSymlinkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h640v128H128V0h1115l549 549v347h-128V640h-512V128H256v1792zM1280 512h293l-293-293v293zm768 512v1024H1024V1024h1024zm-128 128h-768v768h768v-768zm-621 531l274-275h-165v-128h384v384h-128v-165l-275 274-90-90z" />
    </svg>
  ),
  displayName: 'FileSymlinkIcon',
});

export default FileSymlinkIcon;
