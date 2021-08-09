import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MiniExpandIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1243 1024l-91-91 549-549h-421V256h640v640h-128V475l-549 549zm549 128h128v640H128V256h896v128H256v768h768v512h768v-512zM256 1280v384h640v-384H256z" />
    </svg>
  ),
  displayName: 'MiniExpandIcon',
});

export default MiniExpandIcon;
