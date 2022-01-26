import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeleteRowsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 128H0V0h1024v512H896V128zm515 832l-320 320H0V640h1092l319 320zm-515 448h128v512H0v-128h896v-384zm1059-131l-227-227-227 227-90-90 227-227-227-227 91-90 226 226 227-226 90 90-226 227 227 227-91 90z" />
    </svg>
  ),
  displayName: 'DeleteRowsIcon',
});

export default DeleteRowsIcon;
