import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoveLinkXIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2045 1502l-226 226 226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91z" />
    </svg>
  ),
  displayName: 'RemoveLinkXIcon',
});

export default RemoveLinkXIcon;
