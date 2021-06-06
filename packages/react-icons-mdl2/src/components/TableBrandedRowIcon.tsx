import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableBrandedRowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm768 1024h512V768H768v384zM640 768H128v384h512V768zm768 384h512V768h-512v384z" />
    </svg>
  ),
  displayName: 'TableBrandedRowIcon',
});

export default TableBrandedRowIcon;
