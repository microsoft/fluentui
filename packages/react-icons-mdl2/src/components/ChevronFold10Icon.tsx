import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronFold10Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1186l610 610-145 145-465-465-465 465-145-145 610-610zm0-324L414 252l145-145 465 465 465-465 145 145-610 610z" />
    </svg>
  ),
  displayName: 'ChevronFold10Icon',
});

export default ChevronFold10Icon;
