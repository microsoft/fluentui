import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextRotate90DegreesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm1920 1536V256H128v1408h1792zM896 755L256 995V892l128-48V564l-128-48V413l640 240v102zm-384 41l247-92-247-92v184zm1277 417l-317 317-317-317 90-90 163 163V384h128v902l163-163 90 90z" />
    </svg>
  ),
  displayName: 'TextRotate90DegreesIcon',
});

export default TextRotate90DegreesIcon;
