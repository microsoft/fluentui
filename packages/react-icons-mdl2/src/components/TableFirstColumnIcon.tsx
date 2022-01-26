import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableFirstColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm1920 512V256h-512v384h512zM768 256v384h512V256H768zm0 1024v384h512v-384H768zm0-128h512V768H768v384zm640-384v384h512V768h-512zm0 896h512v-384h-512v384z" />
    </svg>
  ),
  displayName: 'TableFirstColumnIcon',
});

export default TableFirstColumnIcon;
