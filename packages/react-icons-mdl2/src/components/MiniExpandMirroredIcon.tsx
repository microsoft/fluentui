import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MiniExpandMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M805 1024l91-91-549-549h421V256H128v640h128V475l549 549zm-549 128H128v640h1792V256h-896v128h768v768h-768v512H256v-512zm1536 128v384h-640v-384h640z" />
    </svg>
  ),
  displayName: 'MiniExpandMirroredIcon',
});

export default MiniExpandMirroredIcon;
