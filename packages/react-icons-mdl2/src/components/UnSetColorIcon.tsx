import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnSetColorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1536H0V256h2048zm-128 128H128v1280h1792V384zm-128 1152H256V512h1536v1024zm-128-896H540l1124 715V640zM384 1408h1124L384 693v715z" />
    </svg>
  ),
  displayName: 'UnSetColorIcon',
});

export default UnSetColorIcon;
