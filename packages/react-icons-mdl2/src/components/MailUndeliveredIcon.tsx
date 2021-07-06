import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailUndeliveredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v896h-128V648l-896 447-896-447v888h1152v128H0V384h2048zM1024 953l881-441H143l881 441zm1021 549l-226 226 226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91z" />
    </svg>
  ),
  displayName: 'MailUndeliveredIcon',
});

export default MailUndeliveredIcon;
