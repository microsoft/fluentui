import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DuplicateRowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 768h384v768H384v-384H0V384h1664v384zM384 1024V768h1152V512H128v512h256zm1536 384V896H512v512h1408z" />
    </svg>
  ),
  displayName: 'DuplicateRowIcon',
});

export default DuplicateRowIcon;
