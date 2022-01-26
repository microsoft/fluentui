import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BookmarkReportIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1664v-640h384v640H0zM1920 384v384h-384V384h384zM1408 0v768h-256v896h-128V0h384zM512 1664V384h384v1280H512zm768-768h768v1152l-384-256-384 256V896zm640 128h-512v785q65-43 128-85t128-86q65 42 128 85t128 86v-785z" />
    </svg>
  ),
  displayName: 'BookmarkReportIcon',
});

export default BookmarkReportIcon;
