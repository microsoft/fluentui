import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextRotate270DegreesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1664H0V128zm1920 1536V256H128v1408h1792zM896 1507l-640-240v-102l640-240v103l-128 48v280l128 48v103zm-256-383l-247 92 247 92v-184zm768-496l-163 163-90-90 317-317 317 317-90 90-163-163v902h-128V628z" />
    </svg>
  ),
  displayName: 'TextRotate270DegreesIcon',
});

export default TextRotate270DegreesIcon;
