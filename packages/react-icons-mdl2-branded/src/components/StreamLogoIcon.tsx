import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const StreamLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1919 1024h1q-1 21-11 40t-29 30L609 1903q-26 17-56 17-21 0-40-8t-34-22-22-32-9-41v-452l-235 162q-6 5-14 7t-16 2q-24 0-39-18t-16-41V571q0-23 15-41t40-18q8 0 16 2t14 7l235 162V230q0-22 8-40t23-32 33-22 41-8q30 0 56 17l1272 806q19 12 28 31t10 42zM576 275v497l273 188h807L576 275zM256 707v634l461-317-461-317zm320 1066l1076-685H849l-273 188v497z" />
    </svg>
  ),
  displayName: 'StreamLogoIcon',
});

export default StreamLogoIcon;
