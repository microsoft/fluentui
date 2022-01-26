import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PicturePositionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 512h1024v1024H512V512zm128 896h549l-357-358-192 193v165zm0-768v421l192-191 539 538h37V640H640zm576 256q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM859 347l-91-91L1024 0l256 256-91 91-165-166-165 166zm330 1354l91 91-256 256-256-256 91-91 165 166 165-166zM347 859l-166 165 166 165-91 91L0 1024l256-256 91 91zm1701 165l-256 256-91-91 166-165-166-165 91-91 256 256z" />
    </svg>
  ),
  displayName: 'PicturePositionIcon',
});

export default PicturePositionIcon;
