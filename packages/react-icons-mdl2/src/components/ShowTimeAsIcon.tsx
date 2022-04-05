import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShowTimeAsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h2048v2048H0V0zm128 768v165l165-165H128zm0 347v165h165l512-512H475l-347 347zm1792 74V859l-421 421h330l91-91zm-603 91l512-512h-330l-512 512h330zm-512 0l512-512H987l-512 512h330zM128 640h1792V128H128v512z" />
    </svg>
  ),
  displayName: 'ShowTimeAsIcon',
});

export default ShowTimeAsIcon;
