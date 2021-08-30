import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Volume0Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M677 256h91v1536h-90l-385-384H0V640h293l384-384zm-37 1317V475L347 768H128v512h219l293 293z" />
    </svg>
  ),
  displayName: 'Volume0Icon',
});

export default Volume0Icon;
