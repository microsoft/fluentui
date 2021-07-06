import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronUnfold10Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M559 815L414 670l610-610 610 610-145 145-465-465-465 465zm930 418l145 145-610 610-610-610 145-145 465 465 465-465z" />
    </svg>
  ),
  displayName: 'ChevronUnfold10Icon',
});

export default ChevronUnfold10Icon;
