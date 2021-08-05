import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CombineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 896v128h-677l210 211-90 90-365-365 365-365 90 90-210 211h677zM467 685l90-90 365 365-365 365-90-90 210-211H0V896h677L467 685z" />
    </svg>
  ),
  displayName: 'CombineIcon',
});

export default CombineIcon;
