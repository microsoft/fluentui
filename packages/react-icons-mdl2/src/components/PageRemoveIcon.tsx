import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageRemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1819 1728l226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91-226 226zM256 1920h1024v128H128V0h1115l549 549v731h-128V640h-512V128H256v1792zM1280 512h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'PageRemoveIcon',
});

export default PageRemoveIcon;
