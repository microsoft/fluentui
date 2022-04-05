import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChevronUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1955 1533l-931-930-931 930-90-90L1024 421l1021 1022-90 90z" />
    </svg>
  ),
  displayName: 'ChevronUpIcon',
});

export default ChevronUpIcon;
