import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PictureTileIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M704 384q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM1920 0v1920H0V0h1920zm-896 896h549l-357-358-192 193v165zM128 128v421l192-191 539 538h37V128H128zm0 768h549L320 538 128 731v165zm0 896h549l-357-358-192 193v165zm768-768H128v421l192-191 539 538h37v-768zm128 768h549l-357-358-192 193v165zm768-768h-768v421l192-191 539 538h37v-768zm0-128V128h-768v421l192-191 539 538h37zm-192-640q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19zM704 1280q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zm896 0q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'PictureTileIcon',
});

export default PictureTileIcon;
