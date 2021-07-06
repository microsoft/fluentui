import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TableBrandedColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm768 640v384h512V768H768zm512-128V256H768v384h512zm-512 640v384h512v-384H768z" />
    </svg>
  ),
  displayName: 'TableBrandedColumnIcon',
});

export default TableBrandedColumnIcon;
