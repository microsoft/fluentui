import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableTotalRowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm1920 512V256h-512v384h512zm-640 128H768v384h512V768zM768 640h512V256H768v384zm-128 512V768H128v384h512zm768 0h512V768h-512v384zM640 256H128v384h512V256z" />
    </svg>
  ),
  displayName: 'TableTotalRowIcon',
});

export default TableTotalRowIcon;
