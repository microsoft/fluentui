import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileCommentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1371 1536l-384 384h677v-256h128v384H128V0h1115l421 421v90h-90l-294-292v293h-128V128H256v1792h704v-384H768V640h1280v896h-677zm-54-128h603V768H896v640h192v230l229-230zm-293-512h768v128h-768V896zm0 256h768v128h-768v-128z" />
    </svg>
  ),
  displayName: 'FileCommentIcon',
});

export default FileCommentIcon;
