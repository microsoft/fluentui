import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricPictureLibraryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v384h-128V512h-704q-56 0-90 9t-58 24-41 31-37 31-50 23-76 10H128v896h384v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h704q27 0 50 10t40 27 28 41 10 50zm-1184 0q27 0 45-9t35-22 34-28 39-28q-15-17-31-45t-36-56-40-48-46-20H128v256h736zM640 2048V1024h1408v1024H640zm987-128h202l-229-230-101 102 128 128zm-859-768v549l320-319 320 319 192-191 320 319v-677H768zm0 731v37h677l-357-358-320 321zm960-475q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'FabricPictureLibraryIcon',
});

export default FabricPictureLibraryIcon;
