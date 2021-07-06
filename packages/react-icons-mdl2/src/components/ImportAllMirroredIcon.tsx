import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ImportAllMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1030 896v128l772 1-289 290 90 90 445-445-445-445-90 90 292 292-775-1zM902 512H6v896h896V512zM134 896V640h256v256H134zm384-256h256v256H518V640zm256 384v256H518v-256h256zm-384 256H134v-256h256v256z" />
    </svg>
  ),
  displayName: 'ImportAllMirroredIcon',
});

export default ImportAllMirroredIcon;
