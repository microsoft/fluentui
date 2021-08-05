import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileHTMLIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h256v128H128V0h1115l512 512h37v768h-128V640h-512V128H256v1792zM1573 512l-293-293v293h293zM877 1517l-211 211 211 211-90 90-301-301 301-301 90 90zm339 19q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-40 15-75t41-61 61-41 75-15zm730 192l-301 301-90-90 211-211-211-211 90-90 301 301z" />
    </svg>
  ),
  displayName: 'FileHTMLIcon',
});

export default FileHTMLIcon;
