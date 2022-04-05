import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Nav2DMapViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1344 423l704-234v1414l-704 235-640-213L0 1859V445l704-235 640 213zm-576-57v1145l512 171V537L768 366zM128 537v1145l512-171V366L128 537zm1792 974V366l-512 171v1145l512-171z" />
    </svg>
  ),
  displayName: 'Nav2DMapViewIcon',
});

export default Nav2DMapViewIcon;
