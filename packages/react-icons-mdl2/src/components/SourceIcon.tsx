import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SourceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1151 641v127H256V641h895zm0 512v127H256v-127h895zm256-768h641v1407H639v-256H0V129h1407v256zM127 256v129h1153V256H127zm0 1153h1153V512H127v897zm1792 256V768h-512v129h385v127h-385v129h385v127h-385v129h385v127H768v129h1151zm0-1024V512h-512v129h512zm-768 256v127H256V897h895z" />
    </svg>
  ),
  displayName: 'SourceIcon',
});

export default SourceIcon;
