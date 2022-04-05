import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BuildIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1280H384v-256h256v256zm1280-512v1152H128V768h128v640h1536V768h128zM896 1536H640v256h256v-256zm512 0h-256v256h256v-256zm-512-512h256v256H896v-256zm768 256h-256v-256h256v256zM960 922L659 621l90-90 147 146V0h128v677l147-146 90 90-301 301z" />
    </svg>
  ),
  displayName: 'BuildIcon',
});

export default BuildIcon;
