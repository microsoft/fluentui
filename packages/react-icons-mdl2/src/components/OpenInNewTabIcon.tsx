import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OpenInNewTabIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1664h-384v384H0V384h384V0h1664zm-128 1536V128H512v256h256v128H128v1408h1408v-640h128v256h256zm-979-339l-90-90 594-595h-421V384h640v640h-128V603l-595 594z" />
    </svg>
  ),
  displayName: 'OpenInNewTabIcon',
});

export default OpenInNewTabIcon;
