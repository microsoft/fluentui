import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HorizontalTabKeyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M475 512h1573v128H475l210 211-90 90-365-365 365-365 90 90-210 211zM128 256v640H0V256h128zm1235 941l90-90 365 365-365 365-90-90 210-211H0v-128h1573l-210-211zm557 595v-640h128v640h-128z" />
    </svg>
  ),
  displayName: 'HorizontalTabKeyIcon',
});

export default HorizontalTabKeyIcon;
