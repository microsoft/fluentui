import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TilesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 256v640H0V256h1280zm-128 512V384H128v384h1024zm256-512h640v640h-640V256zm512 512V384h-384v384h384zM768 1664v-640h1280v640H768zm128-512v384h1024v-384H896zM0 1664v-640h640v640H0zm128-512v384h384v-384H128z" />
    </svg>
  ),
  displayName: 'TilesIcon',
});

export default TilesIcon;
