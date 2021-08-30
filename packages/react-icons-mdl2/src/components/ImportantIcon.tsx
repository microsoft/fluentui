import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ImportantIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 1408H896V128h256v1280zm0 512H896v-256h256v256z" />
    </svg>
  ),
  displayName: 'ImportantIcon',
});

export default ImportantIcon;
