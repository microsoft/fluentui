import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentArrowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M573 643l317 317-317 317-90-90 163-163H0V896h646L483 733l90-90z" />
    </svg>
  ),
  displayName: 'IncreaseIndentArrowIcon',
});

export default IncreaseIndentArrowIcon;
