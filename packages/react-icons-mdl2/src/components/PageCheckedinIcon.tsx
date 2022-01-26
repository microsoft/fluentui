import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageCheckedinIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h1024v128H128V0h1115l549 549v731h-128V640h-512V128H256v1792zM1280 512h293l-293-293v293zm659 1517l-403-402v293h-128v-512h512v128h-293l402 403-90 90z" />
    </svg>
  ),
  displayName: 'PageCheckedinIcon',
});

export default PageCheckedinIcon;
