import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableLastColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm768 640v384h512V768H768zm-128 384V768H128v384h512zm640-512V256H768v384h512zm0 640H768v384h512v-384zM640 256H128v384h512V256zM128 1280v384h512v-384H128z" />
    </svg>
  ),
  displayName: 'TableLastColumnIcon',
});

export default TableLastColumnIcon;
