import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RenameIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M255 1149V895h770v254H255zm1026 260H-1V639h1282v130H129v510h1152v130zm768-770v770h-386v-130h256V769h-256V639h386zm-512 928q111 96 255 96h1v130h-1q-176 0-318-110-70 54-151 82t-171 28h-1v-130h1q145 0 255-93V474q-52-44-116-66t-139-23h-1V255h1q91 0 172 27t150 79q138-106 318-106h1v130h-1q-148 0-255 92v1090z" />
    </svg>
  ),
  displayName: 'RenameIcon',
});

export default RenameIcon;
