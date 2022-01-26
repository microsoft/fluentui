import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M64 448h1920v1152H64V448z" />
    </svg>
  ),
  displayName: 'MailFillIcon',
});

export default MailFillIcon;
