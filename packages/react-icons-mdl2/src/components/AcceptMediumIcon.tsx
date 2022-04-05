import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AcceptMediumIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1902 196l121 120L683 1657 25 999l121-121 537 537L1902 196z" />
    </svg>
  ),
  displayName: 'AcceptMediumIcon',
});

export default AcceptMediumIcon;
